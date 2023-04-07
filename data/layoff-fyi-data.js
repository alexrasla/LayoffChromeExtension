import rsshub from 'rsshub';

export async function getLayoffFyiData() {
    rsshub.init();
    return await rsshub.request('/layoffs')
}