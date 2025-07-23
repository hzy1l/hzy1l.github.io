/**
 * ZY.Logic Lab - 主JavaScript文件
 * 包含网站通用功能和交互逻辑
 */

// 搜索功能
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    const searchTarget = this.getAttribute('data-search-target');
    
    if (searchTarget === 'projects') {
      filterProjects(searchTerm);
    } else if (searchTarget === 'tutorials') {
      filterTutorials(searchTerm);
    } else if (searchTarget === 'knowledge') {
      filterKnowledge(searchTerm);
    } else if (searchTarget === 'worklog') {
      filterWorklog(searchTerm);
    } else {
      // 全站搜索
      console.log('全站搜索:', searchTerm);
      // 这里可以实现全站搜索逻辑
    }
  });
}

// 过滤项目
function filterProjects(searchTerm) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-text').textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    
    const isVisible = 
      title.includes(searchTerm) || 
      description.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm));
    
    card.style.display = isVisible ? 'flex' : 'none';
  });
  
  updateFilterResults('project');
}

// 过滤教程
function filterTutorials(searchTerm) {
  const tutorialCards = document.querySelectorAll('.tutorial-card');
  
  tutorialCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-text').textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    
    const isVisible = 
      title.includes(searchTerm) || 
      description.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm));
    
    card.style.display = isVisible ? 'flex' : 'none';
  });
  
  updateFilterResults('tutorial');
}

// 过滤知识库
function filterKnowledge(searchTerm) {
  const knowledgeCards = document.querySelectorAll('.knowledge-card');
  
  knowledgeCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const description = card.querySelector('.card-text').textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    
    const isVisible = 
      title.includes(searchTerm) || 
      description.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm));
    
    card.style.display = isVisible ? 'flex' : 'none';
  });
  
  updateFilterResults('knowledge');
}

// 过滤工作日志
function filterWorklog(searchTerm) {
  const logItems = document.querySelectorAll('.log-item');
  
  logItems.forEach(item => {
    const title = item.querySelector('.log-title').textContent.toLowerCase();
    const content = item.querySelector('.log-content').textContent.toLowerCase();
    const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
    const date = item.querySelector('.log-date').textContent.toLowerCase();
    
    const isVisible = 
      title.includes(searchTerm) || 
      content.includes(searchTerm) ||
      tags.some(tag => tag.includes(searchTerm)) ||
      date.includes(searchTerm);
    
    item.style.display = isVisible ? 'block' : 'none';
  });
  
  updateFilterResults('log');
}

// 更新过滤结果显示
function updateFilterResults(itemType) {
  let selector, containerSelector;
  
  switch(itemType) {
    case 'project':
      selector = '.project-card';
      containerSelector = '.projects-grid';
      break;
    case 'tutorial':
      selector = '.tutorial-card';
      containerSelector = '.tutorials-grid';
      break;
    case 'knowledge':
      selector = '.knowledge-card';
      containerSelector = '.knowledge-grid';
      break;
    case 'log':
      selector = '.log-item';
      containerSelector = '.logs-container';
      break;
    default:
      return;
  }
  
  const items = document.querySelectorAll(selector);
  const container = document.querySelector(containerSelector);
  const visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
  
  if (visibleItems.length === 0 && container) {
    // 如果没有匹配项，显示无结果提示
    let noResults = container.querySelector('.no-results');
    
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = '<p>没有找到匹配的结果</p>';
      container.appendChild(noResults);
    } else {
      noResults.style.display = 'block';
    }
  } else {
    // 如果有匹配项，隐藏无结果提示
    const noResults = container?.querySelector('.no-results');
    if (noResults) {
      noResults.style.display = 'none';
    }
  }
}

// 分类过滤器
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      const filterTarget = this.getAttribute('data-filter-target');
      
      // 更新按钮状态
      document.querySelectorAll(`[data-filter-target="${filterTarget}"]`).forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // 应用过滤
      if (filterTarget === 'projects') {
        filterProjectsByCategory(category);
      } else if (filterTarget === 'tutorials') {
        filterTutorialsByCategory(category);
      } else if (filterTarget === 'knowledge') {
        filterKnowledgeByCategory(category);
      } else if (filterTarget === 'worklog') {
        filterWorklogByCategory(category);
      }
    });
  });
}

// 按分类过滤项目
function filterProjectsByCategory(category) {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = cardCategory === category ? 'flex' : 'none';
    }
  });
  
  updateFilterResults('project');
}

// 按分类过滤教程
function filterTutorialsByCategory(category) {
  const tutorialCards = document.querySelectorAll('.tutorial-card');
  
  tutorialCards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else if (category === 'beginner' || category === 'intermediate' || category === 'advanced') {
      const difficulty = card.getAttribute('data-difficulty');
      card.style.display = difficulty === category ? 'flex' : 'none';
    } else {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = cardCategory === category ? 'flex' : 'none';
    }
  });
  
  updateFilterResults('tutorial');
}

// 按分类过滤知识库
function filterKnowledgeByCategory(category) {
  const knowledgeCards = document.querySelectorAll('.knowledge-card');
  
  knowledgeCards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else {
      const cardCategory = card.getAttribute('data-category');
      card.style.display = cardCategory === category ? 'flex' : 'none';
    }
  });
  
  updateFilterResults('knowledge');
}

// 按分类过滤工作日志
function filterWorklogByCategory(category) {
  const logItems = document.querySelectorAll('.log-item');
  
  logItems.forEach(item => {
    if (category === 'all') {
      item.style.display = 'block';
    } else {
      const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
      item.style.display = tags.includes(category.toLowerCase()) ? 'block' : 'none';
    }
  });
  
  updateFilterResults('log');
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
  // 初始化搜索功能
  initSearch();
  
  // 初始化分类过滤器
  initCategoryFilters();
  
  // 添加导航栏活动状态
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-links a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
  });
});