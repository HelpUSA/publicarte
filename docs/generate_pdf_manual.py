# -*- coding: utf-8 -*-
import os
import sys
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "DOCUMENTACAO_E_MANUAL_TERCIO_PUBLICARTE.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom Palette
    PRIMARY = colors.HexColor("#1e3a8a")     # Deep Blue
    SECONDARY = colors.HexColor("#0284c7")   # Sky Blue
    ACCENT = colors.HexColor("#059669")      # Emerald Green
    DARK = colors.HexColor("#1e293b")        # Dark Slate
    LIGHT_BG = colors.HexColor("#f8fafc")    # Off-white
    BORDER = colors.HexColor("#cbd5e1")      # Slate border
    AMBER_BG = colors.HexColor("#fef3c7")    # Light Amber

    # Custom Styles
    style_title = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY,
        alignment=TA_LEFT,
        spaceAfter=4
    )

    style_subtitle = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=SECONDARY,
        alignment=TA_LEFT,
        spaceAfter=10
    )

    style_meta = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK,
        spaceAfter=2
    )

    style_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=SECONDARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK,
        spaceAfter=5,
        alignment=TA_LEFT
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=DARK,
        leftIndent=10,
        spaceAfter=3
    )

    style_th = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=colors.white,
        alignment=TA_LEFT
    )

    style_td = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=DARK,
        alignment=TA_LEFT
    )

    style_td_status = ParagraphStyle(
        'TableCellStatus',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        textColor=ACCENT,
        alignment=TA_CENTER
    )

    story = []

    # Header Card
    header_data = [
        [
            Paragraph("<b>PUBLIC ARTE – COMUNICAÇÃO VISUAL</b>", style_meta),
            Paragraph("<b>DATA:</b> 24/09/2026", ParagraphStyle('RightMeta', parent=style_meta, alignment=TA_RIGHT))
        ],
        [
            Paragraph("<b>SISTEMA DE GESTÃO & FRENTE DE CAIXA (PDV SOFTCOM)</b>", style_meta),
            Paragraph("<b>GESTOR:</b> Tércio Grassi", ParagraphStyle('RightMeta2', parent=style_meta, alignment=TA_RIGHT))
        ]
    ]
    t_header = Table(header_data, colWidths=[300, 220])
    t_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_BG),
        ('BOX', (0, 0), (-1, -1), 1, PRIMARY),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 10))

    # Document Title
    story.append(Paragraph("DOCUMENTAÇÃO OFICIAL & MANUAL DO USUÁRIO", style_title))
    story.append(Paragraph("Sistema de Vendas Frente de Caixa (Modelo Softcom), Cadastros Unificados & Perfis de Acesso", style_subtitle))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=10))

    # --- SEÇÃO 1: RELATÓRIO DE IMPLEMENTAÇÃO ---
    story.append(Paragraph("1. Relatório Oficial de Implementação", style_h1))
    story.append(Paragraph(
        "Conforme solicitado pelo proprietário <b>Tércio Grassi</b>, o sistema da Public Arte "
        "(<font color='#0284c7'><u>https://publicarte.helpusbr.com/admin</u></font>) foi atualizado com "
        "<b>Cadastros Unificados Completo</b>, <b>Perfis de Acesso (Admin e Vendedor)</b>, <b>Grade Visual com Fotos de Produtos no PDV</b> "
        "e <b>Configurações da Empresa</b>, mantendo a agilidade do modelo <b>Frente de Caixa (PDV Softcom)</b> sem travamento de estoque.",
        style_body
    ))

    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Tabela: Resumo dos Requisitos Solicitados vs. Implementados</b>", style_h2))

    req_data = [
        [
            Paragraph("Requisito Solicitado", style_th),
            Paragraph("Status", ParagraphStyle('THC', parent=style_th, alignment=TA_CENTER)),
            Paragraph("Detalhes da Implementação", style_th)
        ],
        [
            Paragraph("<b>Perfis de Acesso (Admin / Vendedor)</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Admin (tercio / admin1993) com acesso total e simulador de perfis; Vendedor (vendedor / venda123) restrito ao PDV e Orçamentos.", style_td)
        ],
        [
            Paragraph("<b>Cadastros Unificados Completo</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Clientes (com histórico de compras), Produtos (com foto, custo e margem de lucro %), Funcionários (cargos) e Fornecedores ('pessoa que falo').", style_td)
        ],
        [
            Paragraph("<b>Fotos dos Produtos no PDV</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Grade de seleção no PDV exibindo foto/imagem visual de cada produto no catálogo.", style_td)
        ],
        [
            Paragraph("<b>Sem Trava de Estoque</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Vendas e cadastro sem bloqueio por quantidade de estoque.", style_td)
        ],
        [
            Paragraph("<b>Configurações da Empresa (⚙️)</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Painel para definir CNPJ, Endereço, WhatsApp, Chave PIX e Logo oficial.", style_td)
        ],
        [
            Paragraph("<b>Cálculo de Troco & Fiado</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Cálculo automático de troco e envio de saldo devedor para Contas a Receber.", style_td)
        ],
        [
            Paragraph("<b>Cupom Não Fiscal</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Comprovante timbrado estilo bobina com botões para Impressão e WhatsApp.", style_td)
        ]
    ]

    t_req = Table(req_data, colWidths=[130, 70, 320])
    t_req.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    story.append(t_req)
    story.append(Spacer(1, 10))

    # --- SEÇÃO 2: MANUAL DO USUÁRIO ---
    story.append(Paragraph("2. Manual de Operação dos Módulos do Sistema", style_h1))

    # Abas
    story.append(Paragraph("🛒 <b>1. Frente de Caixa (PDV Softcom com Fotos):</b> Seleção rápida de produtos na grade com imagem. Suporte a cliente balcão ou cadastrado, item avulso sob medida, desconto, troco automático em dinheiro e venda fiado (A Prazo). Emissão de recibo não fiscal com 1 clique para imprimir (🖨️) ou enviar no WhatsApp (📲).", style_bullet))
    story.append(Paragraph("👥 <b>2. Gestão de Clientes:</b> Cadastro completo e botão '📋 Histórico' para abrir modal com todas as compras já realizadas pelo cliente.", style_bullet))
    story.append(Paragraph("📦 <b>3. Produtos & Serviços:</b> Cadastro com URL da Foto, Preço de Custo, Preço de Venda e cálculo em tempo real da Margem de Lucro (%). Funções de Editar (✏️) e Excluir (🗑️).", style_bullet))
    story.append(Paragraph("👔 <b>4. Funcionários:</b> Cadastro da equipe com cargos/funções e nível de acesso.", style_bullet))
    story.append(Paragraph("🏢 <b>5. Fornecedores:</b> Empresa, contato direto ('Pessoa que falo'), WhatsApp, endereço e categoria de produtos.", style_bullet))
    story.append(Paragraph("💰 <b>6. Financeiro & Caixa:</b> Resumo de faturamento, controle de Contas a Receber (Fiado) com botão 'Quitar Fiado' e reemissão de cupons.", style_bullet))
    story.append(Paragraph("⚙️ <b>7. Configurações da Empresa:</b> Alteração de CNPJ, Endereço da loja, WhatsApp oficial, Chave PIX e Logo da empresa.", style_bullet))

    story.append(Spacer(1, 10))

    # Access Box Callout
    box_data = [
        [
            Paragraph(
                "<b>🔑 CREDENCIAIS DE ACESSO DO SISTEMA:</b><br/>"
                "• <b>URL Oficial:</b> <font color='#0284c7'>https://publicarte.helpusbr.com/admin</font><br/>"
                "• <b>Perfil Gestor / Admin (Tércio):</b> Usuário <font fontName='Helvetica-Bold' color='#1e3a8a'>tercio</font> | Senha <font fontName='Helvetica-Bold' color='#1e3a8a'>admin1993</font> (Acesso Total + Simulador de Perfil)<br/>"
                "• <b>Perfil Vendedor / Funcionários:</b> Usuário <font fontName='Helvetica-Bold' color='#0284c7'>vendedor</font> | Senha <font fontName='Helvetica-Bold' color='#0284c7'>venda123</font> (Exclusivo Frente de Caixa & Orçamentos)",
                style_body
            )
        ]
    ]
    t_box = Table(box_data, colWidths=[520])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), AMBER_BG),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#d97706")),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t_box)

    story.append(Spacer(1, 12))
    story.append(Paragraph(
        "<font size=8 color='#64748b'>Documentação gerada por <b>HelpUS Technology</b> · Todos os direitos reservados · (83) 98610-4153 · helpusbr.com</font>",
        ParagraphStyle('FooterNotice', parent=styles['Normal'], alignment=TA_CENTER)
    ))

    doc.build(story)
    print(f"PDF successfully built at: {pdf_path}")

if __name__ == "__main__":
    build_pdf()
