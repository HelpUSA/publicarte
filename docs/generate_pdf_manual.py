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
        fontSize=20,
        leading=24,
        textColor=PRIMARY,
        alignment=TA_LEFT,
        spaceAfter=6
    )

    style_subtitle = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=SECONDARY,
        alignment=TA_LEFT,
        spaceAfter=12
    )

    style_meta = ParagraphStyle(
        'DocMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK,
        spaceAfter=4
    )

    style_h1 = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=SECONDARY,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK,
        spaceAfter=6,
        alignment=TA_LEFT
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK,
        leftIndent=12,
        spaceAfter=4
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
        fontSize=8,
        leading=11,
        textColor=DARK,
        alignment=TA_LEFT
    )

    style_td_status = ParagraphStyle(
        'TableCellStatus',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
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
        ('PADDING', (0, 0), (-1, -1), 8),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 14))

    # Document Title
    story.append(Paragraph("DOCUMENTAÇÃO OFICIAL & MANUAL DO USUÁRIO", style_title))
    story.append(Paragraph("Sistema de Vendas Frente de Caixa (Modelo Softcom) & Gestão sem Estoque", style_subtitle))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=2, spaceAfter=14))

    # --- SEÇÃO 1: RELATÓRIO DE IMPLEMENTAÇÃO ---
    story.append(Paragraph("1. Relatório Oficial de Implementação", style_h1))
    story.append(Paragraph(
        "Conforme solicitado pelo proprietário <b>Tércio Grassi</b>, o sistema da Public Arte "
        "(<font color='#0284c7'><u>https://publicarte.helpusbr.com/admin</u></font>) foi atualizado para "
        "uma estrutura enxuta e direta em <b>3 abas principais</b>, focando exclusivamente no modelo "
        "<b>Frente de Caixa (PDV Softcom)</b> sem restrições ou bloqueios numéricos de estoque.",
        style_body
    ))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Tabela: O Que Foi Solicitado vs. O Que Foi Implementado</b>", style_h2))

    req_data = [
        [
            Paragraph("Requisito Solicitado", style_th),
            Paragraph("Status", ParagraphStyle('THC', parent=style_th, alignment=TA_CENTER)),
            Paragraph("Detalhes da Implementação", style_th)
        ],
        [
            Paragraph("<b>Interface Simplificada</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Painel limpo em 3 abas essenciais (PDV, Produtos e Financeiro), sem poluição visual.", style_td)
        ],
        [
            Paragraph("<b>Frente de Caixa (PDV Softcom)</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Tela de vendas rápidas com busca de produtos, carrinho, desconto e item avulso.", style_td)
        ],
        [
            Paragraph("<b>Sem Trava de Estoque</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Cadastro e vendas desbloqueados, sem exigência de quantidade ou bloqueio numérico.", style_td)
        ],
        [
            Paragraph("<b>Cálculo de Troco & Fiado</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Troco automático para pagamento em dinheiro e valor de entrada para vendas a prazo.", style_td)
        ],
        [
            Paragraph("<b>Cupom Não Fiscal</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Comprovante timbrado estilo bobina térmica com botões de Impressão e WhatsApp.", style_td)
        ],
        [
            Paragraph("<b>Editar e Excluir Produtos</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Opções de Editar (Lápis Azul) e Excluir (Lixeira Vermelha) no catálogo de produtos.", style_td)
        ],
        [
            Paragraph("<b>Controle Financeiro de Caixa</b>", style_td),
            Paragraph("<b>CONCLUÍDO</b>", style_td_status),
            Paragraph("Resumo de faturamento recebido, contas a receber (fiado) e controle de caixa.", style_td)
        ]
    ]

    t_req = Table(req_data, colWidths=[140, 75, 305])
    t_req.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, LIGHT_BG])
    ]))
    story.append(t_req)
    story.append(Spacer(1, 14))

    # --- SEÇÃO 2: MANUAL DO USUÁRIO ---
    story.append(Paragraph("2. Manual de Operação do Gestor (Passo a Passo)", style_h1))
    story.append(Paragraph(
        "A Área Administrativa é dividida em apenas <b>3 abas diretas</b>. A seguir está o guia prático "
        "de utilização para Tércio Grassi e sua equipe:",
        style_body
    ))

    # Aba 1 PDV
    story.append(Paragraph("🛒 Aba 1: Frente de Caixa (PDV Modelo Softcom)", style_h2))
    story.append(Paragraph("• <b>Cliente Balcão:</b> Digite o Nome e WhatsApp do cliente (ou deixe em branco para 'Cliente Balcão').", style_bullet))
    story.append(Paragraph("• <b>Adicionar Produtos:</b> Digite o nome no campo de busca ou clique na grade de produtos.", style_bullet))
    story.append(Paragraph("• <b>Item Avulso / Sob Medida:</b> Clique no botão '<b>+ Adicionar Item Avulso</b>' para registrar serviços sob medida com valor personalizado.", style_bullet))
    story.append(Paragraph("• <b>Desconto & Meio de Pagamento:</b> Insira o valor do desconto (R$) e selecione a forma de pagamento (PIX, Cartão, Dinheiro ou A Prazo).", style_bullet))
    story.append(Paragraph("• <b>Dinheiro & Troco:</b> Digite quanto o cliente entregou para visualizar o troco automático.", style_bullet))
    story.append(Paragraph("• <b>A Prazo (Fiado):</b> Digite quanto o cliente deu de entrada. O saldo restante irá para o controle de Contas a Receber.", style_bullet))
    story.append(Paragraph("• <b>Finalizar Venda (F9):</b> Clique no botão verde '<b>FINALIZAR VENDA (F9)</b>' para emitir o comprovante.", style_bullet))
    story.append(Paragraph("• <b>Impressão & WhatsApp:</b> Utilize os botões no cupom para <b>Imprimir o Recibo (🖨️)</b> ou <b>Enviar via WhatsApp (📲)</b>.", style_bullet))

    story.append(Spacer(1, 6))

    # Aba 2 Produtos
    story.append(Paragraph("📦 Aba 2: Cadastrar & Editar Produtos / Serviços", style_h2))
    story.append(Paragraph("• <b>Inclusão:</b> Preencha Nome, Categoria, Preço e Unidade (un, m², pacote, milheiro, serviço) e clique em '<b>Salvar no Catálogo</b>'.", style_bullet))
    story.append(Paragraph("• <b>Editar / Alterar:</b> Na tabela de produtos, clique no ícone de <b>Lápis Azul (✏️)</b>. O formulário mudará para 'Alterar / Editar Produto'. Modifique os dados e clique em '<b>Salvar Alterações</b>'.", style_bullet))
    story.append(Paragraph("• <b>Excluir:</b> Clique no ícone de <b>Lixeira Vermelha (🗑️)</b> para remover o produto do catálogo.", style_bullet))
    story.append(Paragraph("• <b>Sem Trava de Estoque:</b> Os produtos não exigem saldo nem bloqueiam vendas por quantidade de estoque.", style_bullet))

    story.append(Spacer(1, 6))

    # Aba 3 Financeiro
    story.append(Paragraph("💰 Aba 3: Financeiro, Caixa & Vendas", style_h2))
    story.append(Paragraph("• <b>Faturamento Recebido:</b> Total em R$ das vendas pagas e confirmadas.", style_bullet))
    story.append(Paragraph("• <b>Contas a Receber (Fiado):</b> Saldo pendente das vendas a prazo. Clique em '<b>Quitar Fiado</b>' para dar baixa assim que o cliente pagar.", style_bullet))
    story.append(Paragraph("• <b>Reemitir Comprovantes:</b> Clique em '<b>Ver Recibo</b>' em qualquer venda do histórico para abrir o cupom não fiscal e imprimir ou enviar pelo WhatsApp.", style_bullet))
    story.append(Paragraph("• <b>Abertura e Fechamento de Caixa:</b> Utilize o botão no topo da tela para abrir ou fechar o caixa do expediente.", style_bullet))

    story.append(Spacer(1, 14))

    # Access Box Callout
    box_data = [
        [
            Paragraph(
                "<b>🔑 CREDENCIAIS DE ACESSO DO GESTOR TÉRCIO GRASSI:</b><br/>"
                "• <b>URL Oficial:</b> <font color='#0284c7'>https://publicarte.helpusbr.com/admin</font><br/>"
                "• <b>Usuário:</b> <font fontName='Helvetica-Bold' color='#1e3a8a'>tercio</font> &nbsp;&nbsp;|&nbsp;&nbsp; "
                "<b>Senha:</b> <font fontName='Helvetica-Bold' color='#1e3a8a'>admin1993</font>",
                style_body
            )
        ]
    ]
    t_box = Table(box_data, colWidths=[520])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), AMBER_BG),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#d97706")),
        ('PADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(t_box)

    story.append(Spacer(1, 16))
    story.append(Paragraph(
        "<font size=8 color='#64748b'>Documentação gerada por <b>HelpUS Technology</b> · Todos os direitos reservados · (83) 98610-4153 · helpusbr.com</font>",
        ParagraphStyle('FooterNotice', parent=styles['Normal'], alignment=TA_CENTER)
    ))

    doc.build(story)
    print(f"PDF successfully built at: {pdf_path}")

if __name__ == "__main__":
    build_pdf()
