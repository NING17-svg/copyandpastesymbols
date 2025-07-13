#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
符号抓取脚本
用于从coolsymbol.top网站抓取各类符号并保存为JSON格式
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import random
import re
from urllib.parse import urljoin
import logging
import concurrent.futures
import sys
import codecs
import html

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("scrape_log.txt", encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 全局变量
BASE_URL = "https://www.coolsymbol.top/"
SITEMAP_URL = "https://www.coolsymbol.top/sitemap.xml"
OUTPUT_DIR = "./src/data"  # 修正输出目录路径
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
]

# 已知的分类页面
KNOWN_CATEGORY_PAGES = [
    "https://www.coolsymbol.top/all-symbol.html",
    "https://www.coolsymbol.top/heart-symbol.html",
    "https://www.coolsymbol.top/text-animal-symbol.html"
]

# 并行设置
MAX_WORKERS = 5  # 并行线程数，可以根据电脑性能调整

# 抓取前检查输出目录是否存在
def ensure_output_dir():
    """确保输出目录存在"""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        logger.info(f"创建输出目录: {OUTPUT_DIR}")


def get_random_user_agent():
    """随机获取一个User-Agent以模拟不同浏览器"""
    return random.choice(USER_AGENTS)


def fetch_page(url):
    """
    抓取网页内容
    
    Args:
        url: 要抓取的URL
        
    Returns:
        BeautifulSoup对象或None（如果抓取失败）
    """
    headers = {
        'User-Agent': get_random_user_agent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': BASE_URL,
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
    }
    
    try:
        logger.info(f"正在抓取: {url}")
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # 如果响应状态码不是200，将引发HTTPError异常
        
        # 确保响应使用正确的编码
        if response.encoding.lower() != 'utf-8':
            response.encoding = 'utf-8'
        
        # 检查内容类型确保是HTML
        content_type = response.headers.get('Content-Type', '').lower()
        if 'text/html' not in content_type and 'xml' not in content_type:
            logger.warning(f"非HTML/XML内容: {content_type}")
            return None
        
        if 'xml' in content_type:
            soup = BeautifulSoup(response.text, 'xml')
        else:
            # 使用html.parser解析器，它对Unicode支持更好
            soup = BeautifulSoup(response.text, 'html.parser')
        return soup
        
    except requests.exceptions.RequestException as e:
        logger.error(f"抓取失败: {url}, 错误: {e}")
        return None


def parse_sitemap(sitemap_url):
    """
    解析站点地图获取所有页面URL
    
    Args:
        sitemap_url: 站点地图URL
        
    Returns:
        站点地图中的URL列表
    """
    try:
        logger.info(f"正在解析站点地图: {sitemap_url}")
        soup = fetch_page(sitemap_url)
        
        if not soup:
            logger.error("无法获取站点地图")
            return []
        
        urls = []
        # 查找所有loc标签，它们包含URL
        for loc in soup.find_all('loc'):
            urls.append(loc.text)
        
        logger.info(f"从站点地图中找到 {len(urls)} 个URL")
        return urls
    except Exception as e:
        logger.error(f"解析站点地图出错: {e}")
        return []


def clean_text(text):
    """
    清理文本，确保Unicode字符正确处理
    
    Args:
        text: 要清理的文本
        
    Returns:
        清理后的文本
    """
    if not text:
        return ""
        
    # 解码HTML实体
    text = html.unescape(text)
    
    # 移除不必要的空白
    text = text.strip()
    
    return text


def extract_symbols_from_page(soup):
    """
    从页面提取符号及其元数据。
    新逻辑: 基于maindata容器，精确提取分类和符号。

    Args:
        soup: 页面的BeautifulSoup对象

    Returns:
        该页面上的符号列表，每个符号是一个包含'symbol', 'name', 'category'的字典。
    """
    symbols_data = []
    
    # 1. 查找主内容容器
    main_data_container = soup.find('div', class_='maindata')
    
    if not main_data_container:
        logger.warning("在页面中未找到 'maindata' 容器，跳过此页。")
        return []

    # 2. 从h1标签提取权威分类名称
    category_name = "Uncategorized"
    title_tag = main_data_container.find('h1', class_='titlesymbol')
    if title_tag and title_tag.get_text():
        # 清理标题以获得更干净的分类名，例如 "Check mark Symbol - ..." -> "Check mark"
        full_title = clean_text(title_tag.get_text())
        category_name = full_title.split(' - ')[0].replace('Symbol', '').replace('Symbols', '').strip()
    else:
        logger.warning("在 'maindata' 容器中未找到 'h1.titlesymbol'，将使用默认分类。")

    # 3. 查找所有class为'symbol'的div元素
    symbol_elements = main_data_container.find_all('div', class_='symbol')
    
    logger.info(f"在分类 '{category_name}' 中找到 {len(symbol_elements)} 个符号元素。")

    # 4. 遍历每个符号元素，提取数据
    for element in symbol_elements:
        symbol_char = clean_text(element.get_text())
        symbol_name = element.get('title', 'No name').strip()
        
        if symbol_char:
            symbols_data.append({
                'symbol': symbol_char,
                'name': symbol_name,
                'category': category_name
            })

    return symbols_data


def remove_duplicates(symbols):
    """
    基于符号和分类去除重复的符号

    Args:
        symbols: 符号字典列表

    Returns:
        去重后的符号列表
    """
    unique_symbols = []
    seen = set()
    for symbol in symbols:
        # 使用符号本身和它的分类来确定唯一性
        identifier = (symbol['symbol'], symbol['category'])
        if identifier not in seen:
            unique_symbols.append(symbol)
            seen.add(identifier)
    
    logger.info(f"去重前共 {len(symbols)} 个符号，去重后剩余 {len(unique_symbols)} 个。")
    return unique_symbols


def process_url(url, retries=3):
    """
    处理单个URL，抓取、解析并提取所有符号。

    Args:
        url: 要处理的URL
        retries: 失败重试次数

    Returns:
        从该URL提取的符号列表
    """
    for attempt in range(retries):
        soup = fetch_page(url)
        if soup:
            # 新的提取函数直接返回带分类的符号列表
            symbols = extract_symbols_from_page(soup)
            if symbols:
                return symbols
            else:
                logger.warning(f"在URL {url} 未提取到任何符号，可能是页面结构不同。")
                return [] # 返回空列表，表示处理完成但无符号

        logger.warning(f"处理URL {url} 失败，正在重试... ({attempt + 1}/{retries})")
        time.sleep(random.uniform(2, 5)) # 重试前等待

    logger.error(f"URL {url} 经过 {retries} 次重试后仍然处理失败。")
    return []


def split_and_save_symbols(symbols, output_dir):
    """
    将符号按分类拆分并保存到不同的JSON文件中。

    Args:
        symbols: 包含所有符号的列表
        output_dir: 保存JSON文件的目录
    """
    # 按分类对符号进行分组
    categorized_symbols = {}
    for symbol in symbols:
        category = symbol.get('category', 'Uncategorized')
        if category not in categorized_symbols:
            categorized_symbols[category] = []
        categorized_symbols[category].append(symbol)
    
    logger.info(f"符号将被拆分为 {len(categorized_symbols)} 个分类。")

    # 为每个分类创建一个JSON文件
    symbols_output_dir = os.path.join(output_dir, 'symbols')
    if not os.path.exists(symbols_output_dir):
        os.makedirs(symbols_output_dir)
        logger.info(f"创建分类目录: {symbols_output_dir}")

    for category, cat_symbols in categorized_symbols.items():
        # 创建一个对文件名友好的分类名
        filename = re.sub(r'[^a-z0-9]+', '-', category.lower()).strip('-') + '.json'
        filepath = os.path.join(symbols_output_dir, filename)
        
        logger.info(f"正在保存 {len(cat_symbols)} 个符号到 {filepath}")
        save_json_with_bom(cat_symbols, filepath)
        
def save_json_with_bom(data, filepath):
    """将数据保存为不带BOM的UTF-8 JSON文件"""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        logger.debug(f"成功保存文件: {filepath}")
    except Exception as e:
        logger.error(f"保存文件失败: {filepath}, 错误: {e}")


def main():
    """主函数，执行整个抓取和处理流程"""
    ensure_output_dir()
    
    start_time = time.time()
    
    # 1. 从站点地图获取所有URL
    # 我们将处理所有页面，因为每个页面都可能是一个分类
    all_urls = parse_sitemap(SITEMAP_URL)
    
    if not all_urls:
        logger.error("未能从站点地图获取URL列表，正在使用已知的分类页面。")
        all_urls = KNOWN_CATEGORY_PAGES
        
    if not all_urls:
        logger.critical("没有可抓取的URL，程序退出。")
        return

    all_symbols = []
    
    # 2. 使用线程池并行处理URL
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        # map会自动处理任务分发和结果收集
        future_to_url = {executor.submit(process_url, url): url for url in all_urls}
        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            try:
                symbols_from_url = future.result()
                if symbols_from_url:
                    all_symbols.extend(symbols_from_url)
                    logger.info(f"成功处理URL {url}，获得 {len(symbols_from_url)} 个符号。")
            except Exception as exc:
                logger.error(f"URL {url} 在执行期间产生异常: {exc}")

    # 3. 去除重复的符号
    unique_symbols = remove_duplicates(all_symbols)

    # 4. 将所有符号保存到一个总的JSON文件中
    all_symbols_path = os.path.join(OUTPUT_DIR, "scraped_symbols.json")
    logger.info(f"正在保存所有 {len(unique_symbols)} 个唯一符号到 {all_symbols_path}")
    save_json_with_bom(unique_symbols, all_symbols_path)
    
    # 5. 按分类拆分并保存到不同文件
    split_and_save_symbols(unique_symbols, OUTPUT_DIR)

    end_time = time.time()
    logger.info(f"所有任务完成，总耗时: {end_time - start_time:.2f} 秒。")

if __name__ == "__main__":
    # 确保在使用管道或重定向时Unicode输出正确
    if sys.stdout.encoding != 'utf-8':
        sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    main()