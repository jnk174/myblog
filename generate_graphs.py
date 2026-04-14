import matplotlib.pyplot as plt
import numpy as np

# Set base style (Modern, white background)
plt.style.use('default')
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['font.family'] = 'Malgun Gothic' # Standard Windows Korean font
plt.rcParams['axes.edgecolor'] = '#E0E0E0'
plt.rcParams['axes.linewidth'] = 0.8
plt.rcParams['grid.color'] = '#F0F0F0'
plt.rcParams['grid.linestyle'] = '--'

# Business Pastel Colors (Soft Blue, Sage Green, Muted Gold, Charcoal)
COLORS = ['#A3C1DA', '#A9D1A1', '#E8D4A2', '#8294C4', '#ACB1B6']

def create_score_distribution():
    # Data from 2022 March Math Mock Exam (High School 1)
    labels = ['1등급', '2등급', '아들의 점수', '3등급', '4등급']
    scores = [88, 77, 73, 66, 54]
    
    fig, ax = plt.subplots(figsize=(8, 4))
    
    # Highlight son's score with a slightly different color or transparency
    bars = ax.bar(labels, scores, color=[COLORS[0], COLORS[0], '#FF9B9B', COLORS[1], COLORS[1]], alpha=0.8)
    
    # Add data labels on top
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height + 1,
                f'{int(height)}점', ha='center', va='bottom', fontsize=10, color='#444444')

    ax.set_title('2022년 3월 고1 수학 등급컷 및 아들의 위치', fontsize=12, pad=20, weight='bold', color='#333333')
    ax.set_ylim(0, 110)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.yaxis.grid(True)
    
    plt.tight_layout()
    plt.savefig('public/images/blog/math_score_distribution.png', dpi=300)
    plt.close()

def create_error_analysis():
    # Categorized errors based on the PDF analysis
    categories = ['대수/함수(20, 26, 29)', '수체계/통계(25, 28)', '기하(27, 30)']
    counts = [3, 2, 2] # Number of questions missed
    
    fig, ax = plt.subplots(figsize=(8, 5))
    
    # Pie chart with muted colors
    wedges, texts, autotexts = ax.pie(counts, labels=categories, autopct='%1.1f%%', 
                                     startangle=140, colors=COLORS, 
                                     wedgeprops={'edgecolor': 'white', 'linewidth': 2},
                                     textprops={'color': '#444444', 'fontsize': 10})
    
    plt.setp(autotexts, size=10, weight="bold", color="white")
    ax.set_title('오답 문항 영역별 비중 분석', fontsize=12, pad=20, weight='bold', color='#333333')
    
    plt.tight_layout()
    plt.savefig('public/images/blog/math_error_analysis.png', dpi=300)
    plt.close()

if __name__ == "__main__":
    create_score_distribution()
    create_error_analysis()
