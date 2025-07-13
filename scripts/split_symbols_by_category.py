#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
符号分类合并脚本
读取由 scrape_symbols.py 生成的细粒度分类文件，
并将它们合并成预定义的顶层分类。
"""

import os
import json
import re
import logging
from collections import defaultdict

# --- 配置 ---
# 输入目录：包含许多细粒度分类JSON文件的目录
INPUT_DIR = "./src/data/symbols"
# 输出目录：存放合并后分类JSON文件的目录
OUTPUT_DIR = "./src/data"
# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("split_log.txt", encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# --- 新的顶层分类体系 ---
# 定义我们网站最终的分类。
# 'keywords' 用于匹配从爬虫抓取到的原始分类文件名。
TOP_LEVEL_CATEGORIES = {
    'emoticons': {
        'display_name': '颜文字',
        'keywords': ['face', 'emoticon', 'emoji', 'donger', 'shrug', 'lenny', 'animal']
    },
    'hearts': {
        'display_name': '爱心符号',
        'keywords': ['heart', 'love']
    },
    'stars_decor': {
        'display_name': '星星 & 装饰',
        'keywords': ['star', 'sparkle', 'decor', 'aesthetic', 'hanging']
    },
    'weather_nature': {
        'display_name': '天气 & 自然',
        'keywords': ['weather', 'flower', 'sun', 'moon', 'nature']
    },
    'arrows': {
        'display_name': '箭头符号',
        'keywords': ['arrow']
    },
    'shapes_borders': {
        'display_name': '形状 & 边框',
        'keywords': ['shape', 'border', 'divider', 'wave', 'line', 'circle', 'square', 'triangle', 'rectangle', 'dot']
    },
    'brackets_punctuation': {
        'display_name': '括号 & 标点',
        'keywords': ['bracket', 'punctuation', 'corner', 'quotation']
    },
    'math_numbers': {
        'display_name': '数学 & 数字',
        'keywords': ['math', 'number', 'roman', 'fraction', 'pi', 'comparison']
    },
    'letters_fonts': {
        'display_name': '字母 & 字体',
        'keywords': ['font', 'letter', 'text', 'alphabet', 'cursive', 'english', 'bubble']
    },
    'currency_units': {
        'display_name': '货币 & 单位',
        'keywords': ['currency', 'unit', 'cryptocurrency']
    },
    'themed': {
        'display_name': '主题符号',
        'keywords': [
            'medical', 'transport', 'chess', 'music', 'zodiac', 'crown', 'daimond', 'house',
            'card', 'dice', 'office', 'trophy', 'award', 'medal', 'key', 'lock', 'warning',
            'writing', 'weapon', 'religion', 'hand', 'copyright', 'trademark', 'loading'
        ]
    },
    'language': {
        'display_name': '语言符号',
        'keywords': ['chinese', 'japanese', 'korean']
    }
}

def load_json_file(filepath):
    """安全地加载一个JSON文件"""
    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            return json.load(f)
    except json.JSONDecodeError:
        logger.error(f"无法解析JSON文件: {filepath}")
    except Exception as e:
        logger.error(f"读取文件时出错: {filepath}, 错误: {e}")
    return None

def find_category_for_file(filename):
    """根据文件名找到它所属的顶层分类"""
    for category, config in TOP_LEVEL_CATEGORIES.items():
        for keyword in config['keywords']:
            if keyword in filename:
                return category
    return 'themed'  # 如果找不到任何匹配，默认为'themed'分类

def remove_duplicates(symbols):
    """基于符号本身(symbol)去重"""
    unique_symbols = []
    seen = set()
    for symbol_data in symbols:
        symbol = symbol_data['symbol']
        if symbol not in seen:
            unique_symbols.append(symbol_data)
            seen.add(symbol)
    return unique_symbols

def main():
    """主执行函数"""
    if not os.path.exists(INPUT_DIR):
        logger.error(f"输入目录不存在: {INPUT_DIR}")
        return

    # 确保输出目录存在
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        logger.info(f"创建输出目录: {OUTPUT_DIR}")

    # 用于存储所有合并后分类的数据
    merged_data = defaultdict(list)

    # 1. 遍历输入目录中的所有JSON文件
    files_processed = 0
    for filename in os.listdir(INPUT_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(INPUT_DIR, filename)
            symbols = load_json_file(filepath)
            
            if symbols:
                # 2. 为该文件确定其顶层分类
                top_category = find_category_for_file(filename)
                
                # 更新一下每个符号对象里的category字段
                for symbol in symbols:
                    symbol['category'] = top_category

                # 3. 将符号列表添加到对应的顶层分类中
                merged_data[top_category].extend(symbols)
                files_processed += 1
                logger.debug(f"文件 '{filename}' 已被归类到 '{top_category}'")

    if files_processed == 0:
        logger.warning("输入目录中没有找到任何JSON文件。")
        return

    logger.info(f"成功处理 {files_processed} 个文件。开始合并和保存...")

    # 4. 为每个顶层分类去重并保存到新的JSON文件
    for category_name, symbols_list in merged_data.items():
        logger.info(f"正在处理分类 '{category_name}'，包含 {len(symbols_list)} 个符号...")
        
        # 去重
        unique_symbols = remove_duplicates(symbols_list)
        logger.info(f"去重后，'{category_name}' 分类剩余 {len(unique_symbols)} 个符号。")

        # 构造输出文件路径
        output_filepath = os.path.join(OUTPUT_DIR, f"{category_name}.json")
        
        # 保存文件
        try:
            with open(output_filepath, 'w', encoding='utf-8') as f:
                json.dump(unique_symbols, f, ensure_ascii=False, indent=4)
            logger.info(f"成功保存文件: {output_filepath}")
        except Exception as e:
            logger.error(f"保存文件失败: {output_filepath}, 错误: {e}")

    logger.info("所有分类已成功合并和保存！")

if __name__ == "__main__":
    main() 