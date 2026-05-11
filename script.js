function toggleLangMenu() {
    document.getElementById("lang-options").classList.toggle("show-lang");
}

function selectLang(lang) {
    changeLang(lang); 
    document.getElementById("current-lang-text").textContent = lang.toUpperCase();
    toggleLangMenu();
}

window.onclick = function(event) {
    if (!event.target.closest('.lang-custom-dropdown')) {
        const dropdown = document.getElementById("lang-options");
        if (dropdown && dropdown.classList.contains('show-lang')) {
            dropdown.classList.remove('show-lang');
        }
    }
}

function toggleNav() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
}

let currentStep = 1;
let currentLang = 'pt';
let uploadedFiles = [];

const translations = {
    pt: {
        title: "Briefing de Comunicação",
        subtitle: "Otimização de Fluxo de Informação Corporativa",
        step_titles: ["Dados Gerais", "O Que e Para Quem", "Conteúdo Detalhado"],
        labels: {
            dept: "Área Solicitante", urgency: "Urgência", contact: "Usuário do Responsável / Contato",
            date: "Período de Envio", theme: "Tema do Comunicado", type: "Tipo de Comunicado",
            public: "Público-Alvo", header: "Título / Header (Chamada Principal)",
            content: "Texto ou Tópicos do Comunicado", media: "Mídias e Arquivos Funcionais"
        },
        placeholders: {
            contact: "Nome ou Ramal", theme: "Ex: Campanha de Vacinação 2024",
            header: "Frase de impacto", content: "Escreva o conteúdo base aqui..."
        },
        next: "Próximo", prev: "Anterior", finish: "Enviar Briefing", success: "Briefing Enviado!"
    },
    en: {
        title: "Communication Briefing",
        subtitle: "Corporate Information Flow Optimization",
        step_titles: ["General Data", "What & Who", "Detailed Content"],
        labels: {
            dept: "Requesting Area", urgency: "Urgency", contact: "Responsible User / Contact",
            date: "Sending Period", theme: "Subject", type: "Communication Type",
            public: "Target Audience", header: "Title / Header (Main Call)",
            content: "Text or Topics", media: "Media and Functional Files"
        },
        placeholders: {
            contact: "Name or Extension", theme: "Ex: Vaccination Campaign 2024",
            header: "Impact phrase", content: "Write the base content here..."
        },
        next: "Next", prev: "Previous", finish: "Send Brief", success: "Briefing Sent!"
    },
    es: {
        title: "Briefing de Comunicación",
        subtitle: "Optimización del Flujo de Información Corporativa",
        step_titles: ["Datos Generales", "Qué y Quién", "Contenido Detallado"],
        labels: {
            dept: "Área Solicitante", urgency: "Urgencia", contact: "Usuario Responsable / Contacto",
            date: "Período de Envío", theme: "Tema del Comunicado", type: "Tipo de Comunicado",
            public: "Público Objetivo", header: "Título / Header (Llamada Principal)",
            content: "Texto o Temas", media: "Medios y Archivos Funcionais"
        },
        placeholders: {
            contact: "Nombre o Extensión", theme: "Ej: Campaña de Vacunación 2024",
            header: "Frase de impacto", content: "Escriba el contenido base aquí..."
        },
        next: "Siguiente", prev: "Anterior", finish: "Enviar Briefing", success: "¡Briefing Enviado!"
    },
    de: {
        title: "Kommunikations-Briefing",
        subtitle: "Optimierung des Informationsflusses im Unternehmen",
        step_titles: ["Allgemeine Daten", "Was & Für Wen", "Detaillierter Inhalt"],
        labels: {
            dept: "Anfordernder Bereich", urgency: "Dringlichkeit", contact: "Verantwortlicher Benutzer / Kontakt",
            date: "Sendezeitraum", theme: "Thema der Mitteilung", type: "Art der Mitteilung",
            public: "Zielgruppe", header: "Titel / Header (Hauptaufruf)",
            content: "Text oder Themen", media: "Medien und funktionale Dateien"
        },
        placeholders: {
            contact: "Name oder Durchwahl", theme: "Z.B.: Impfkampagne 2024",
            header: "Impact-Satz", content: "Basisinhalt hier schreiben..."
        },
        next: "Weiter", prev: "Zurück", finish: "Briefing senden", success: "Briefing Gesendet!"
    }
};

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('f-files');
const fileListDisplay = document.getElementById('file-list');

if(dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    dropZone.addEventListener('dragover', () => dropZone.classList.add('drag-over'));
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));

    dropZone.addEventListener('drop', (e) => {
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });
}

if(fileInput) {
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        uploadedFiles.push(file.name);
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `<i class="fas fa-file-alt"></i> ${file.name}`;
        fileListDisplay.appendChild(item);
    });
}

function changeLang(lang) {
    currentLang = lang;
    updateUI();
}

function updateUI() {
    const t = translations[currentLang];
    document.getElementById('txt-main-title').textContent = t.title;
    document.getElementById('txt-subtitle').textContent = t.subtitle;
    document.getElementById('txt-success').textContent = t.success;
    const stepTitleEl = document.getElementById('txt-step-title');
    if (stepTitleEl) stepTitleEl.textContent = t.step_titles[currentStep - 1];
    document.getElementById('lbl-dept').textContent = t.labels.dept;
    document.getElementById('lbl-urgency').textContent = t.labels.urgency;
    document.getElementById('lbl-contact').textContent = t.labels.contact;
    document.getElementById('lbl-date').textContent = t.labels.date;
    document.getElementById('lbl-theme').textContent = t.labels.theme;
    document.getElementById('lbl-type').textContent = t.labels.type;
    document.getElementById('lbl-public').textContent = t.labels.public;
    document.getElementById('lbl-header').textContent = t.labels.header;
    document.getElementById('lbl-content').textContent = t.labels.content;
    document.getElementById('lbl-media').textContent = t.labels.media;
    document.getElementById('f-requester').placeholder = t.placeholders.contact;
    document.getElementById('f-theme').placeholder = t.placeholders.theme;
    document.getElementById('f-header').placeholder = t.placeholders.header;
    document.getElementById('f-content').placeholder = t.placeholders.content;
    document.getElementById('nextBtn').innerHTML = currentStep === 3 ? `${t.finish} <i class="fas fa-paper-plane"></i>` : `${t.next} <i class="fas fa-arrow-right"></i>`;
    document.getElementById('prevBtn').textContent = t.prev;
    document.getElementById('step-count').textContent = currentStep + "/3";
}

function moveStep(n) {
    if (n === 1) {
        const currentStepEl = document.getElementById(`step${currentStep}`);
        const inputs = currentStepEl.querySelectorAll('input:not([type="file"]), select, textarea');
        let isValid = true;
        let primeiroCampoVazio = null;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.border = '2px solid red';
                isValid = false;
                if (!primeiroCampoVazio) primeiroCampoVazio = input;
            } else {
                input.style.border = '1px solid #ccc';
            }
        });
        if (!isValid) {
            if (primeiroCampoVazio) primeiroCampoVazio.focus();
            return;
        }
    }

    if (n === 1 && currentStep === 3) {
        enviarParaGoogleSheets();
        return;
    }

    const steps = document.querySelectorAll('.form-step');
    steps[currentStep - 1].style.display = 'none';
    currentStep += n;
    steps[currentStep - 1].style.display = 'block';
    updateUI();
    document.getElementById("prevBtn").style.visibility = currentStep === 1 ? "hidden" : "visible";
}

function enviarParaGoogleSheets() {
    // URL que você forneceu
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzcnyNFYeCfv0DXhBYJpoJ9tHFqglHkCsKpplPTtJoD46Y3ibhxEZK-HCqgmQB0-dEf/exec';
    
    // Captura o formulário
    const form = document.getElementById('multi-form');
    
    // Criamos um objeto FormData para capturar todos os inputs pelo atributo "name"
    const formData = new FormData(form);
    
    // Adicionamos manualmente os campos extras que não estão no formulário (Data/Hora e Status)
    const dataHoraAtual = new Date().toLocaleString('pt-BR');
    formData.append('datetime', dataHoraAtual);
    formData.append('status', "Briefing enviado");

    // Desabilita o botão para evitar múltiplos cliques
    const btn = document.getElementById('nextBtn');
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerText = "Enviando...";

    // Envia para o Google Sheets usando a técnica necessária para o App Script (multipart/form-data ou URLSearchParams)
    fetch(scriptURL, { 
        method: 'POST', 
        body: formData 
    })
    .then(response => {
        // Sucesso
        document.getElementById("multi-form").style.display = 'none';
        document.getElementById("success-screen").style.display = 'block';
        
        // Dispara confetes para celebrar a conclusão
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

        // Salva no histórico local (opcional, para visualização na aba Histórico)
        salvarNoHistoricoLocal(formData, dataHoraAtual);
    })
    .catch(error => {
        console.error('Erro ao enviar!', error);
        alert('Erro ao enviar os dados. Verifique sua conexão.');
    })
    .finally(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
    });
}

// Função auxiliar para manter o histórico na página funcionando
function salvarNoHistoricoLocal(formData, dataHora) {
    let history = JSON.parse(localStorage.getItem("briefHistory")) || [];
    const novoItem = {
        theme: formData.get('theme'),
        requester: formData.get('requester'),
        datetime: dataHora,
        status: "Briefing enviado",
        area: formData.get('area'),
        content: formData.get('content')
    };
    history.push(novoItem);
    localStorage.setItem("briefHistory", JSON.stringify(history));
}

function loadHistory() {
    const table = document.getElementById("history-table");
    if(!table) return;
    const history = JSON.parse(localStorage.getItem("briefHistory")) || [];
    table.innerHTML = "";
    history.forEach((item, index) => {
        const status = item.status || "Briefing enviado";
        table.innerHTML += `
            <tr>
                <td>${item.theme || "-"}</td>
                <td>${item.requester || "-"}</td>
                <td>${item.datetime}</td>
                <td><span class="status-badge">${status}</span></td>
                <td><button onclick="openReport(${index})">Visualizar</button></td>
            </tr>`;
    });
}

function openReport(index) {
    const history = JSON.parse(localStorage.getItem("briefHistory")) || [];
    const data = history[index];
    document.getElementById("report-content").innerHTML = `
        <p><strong>Área:</strong> ${data.area}</p>
        <p><strong>Tema:</strong> ${data.theme}</p>
        <p><strong>Conteúdo:</strong> ${data.content}</p>`;
    document.getElementById("report-modal").style.display = "flex";
}

function closeReport() {
    document.getElementById("report-modal").style.display = "none";
}

function resetForm() {
    location.reload(); // Forma mais limpa de resetar estados complexos
}

function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.view-content').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + tab).classList.add('active');
    if (tab === 'history') loadHistory();
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    loadHistory();
});