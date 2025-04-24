let scrapedData = [];

function applySelectorPreset() {
    const preset = document.getElementById('selector-preset').value;
    if (preset) {
        document.getElementById('selector').value = preset;
    }
}

function toggleSelectorField() {
    const scrapeType = document.getElementById('scrape-type').value;
    const selectorField = document.getElementById('selector-field');
    const selectorPresetField = document.getElementById('selector-preset-field');
    
    if (scrapeType === 'emails') {
        // Hide selector fields when scraping emails
        selectorField.style.display = 'none';
        selectorPresetField.style.display = 'none';
    } else {
        // Show selector fields when scraping elements
        selectorField.style.display = 'block';
        selectorPresetField.style.display = 'block';
    }
}

async function startScraping() {
    const url = document.getElementById('url').value;
    const scrapeType = document.getElementById('scrape-type').value;
    
    if (!url) {
        showStatus('Please provide a URL', 'error');
        return;
    }
    
    let selector = '';
    if (scrapeType === 'elements') {
        selector = document.getElementById('selector').value;
        if (!selector) {
            showStatus('Please provide a CSS selector', 'error');
            return;
        }
    }
    
    showStatus('Scraping in progress...', 'loading');
    
    try {
        let response;
        
        if (scrapeType === 'emails') {
            // Use email scraping endpoint
            response = await fetch('/api/scrape-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });
        } else {
            // Use regular element scraping endpoint
            response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, selector })
            });
        }
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to scrape the website');
        }
        
        scrapedData = result.data;
        displayResults(scrapedData);
        
        if (scrapeType === 'emails') {
            showStatus(`Successfully found ${scrapedData.length} unique email addresses from ${url}`, 'success');
        } else {
            showStatus(`Successfully scraped ${scrapedData.length} items from ${url}`, 'success');
        }
    } catch (error) {
        showStatus('Error during scraping: ' + error.message, 'error');
    }
}

function displayResults(data) {
    const resultList = document.getElementById('result-list');
    const emptyMessage = document.querySelector('.empty-results');
    const downloadBtn = document.getElementById('download-btn');
    
    resultList.innerHTML = '';
    
    if (data.length === 0) {
        resultList.style.display = 'none';
        emptyMessage.style.display = 'block';
        downloadBtn.style.display = 'none';
        return;
    }
    
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        resultList.appendChild(li);
    });
    
    resultList.style.display = 'block';
    emptyMessage.style.display = 'none';
    downloadBtn.style.display = 'block';
}

function showStatus(message, type) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
}

function downloadResults() {
    if (scrapedData.length === 0) return;
    
    const dataStr = JSON.stringify(scrapedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'scraped_data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Call this once at page load to set initial visibility
document.addEventListener('DOMContentLoaded', toggleSelectorField);