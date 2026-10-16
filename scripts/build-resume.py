"""Build the website's one-page resume from the audited career data.

Requires reportlab. Run: python3 scripts/build-resume.py
Output: src/files/Levi_Huff_Resume.pdf
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
career = json.loads((ROOT / "src/_data/career.json").read_text())
experience = json.loads((ROOT / "src/_data/experience.json").read_text())
site = json.loads((ROOT / "src/_data/site.json").read_text())
skills = json.loads((ROOT / "src/_data/skills.json").read_text())

def clean(value):
    return escape(value.replace("–", "-").replace("—", "-").replace("·", "|"))

styles = {
    "name": ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=21, leading=24, alignment=TA_CENTER, spaceAfter=6),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9, leading=12, alignment=TA_CENTER, spaceAfter=6),
    "heading": ParagraphStyle("heading", fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=colors.HexColor("#684600"), spaceBefore=10, spaceAfter=4),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13, spaceAfter=4),
    "role": ParagraphStyle("role", fontName="Helvetica-Bold", fontSize=9.5, leading=12, spaceBefore=5, spaceAfter=3),
}
story = []
def paragraph(value, style="body", raw=False):
    return Paragraph(value if raw else clean(value), styles[style])
def heading(value):
    story.append(paragraph(value, "heading"))

story.append(paragraph(site["name"], "name"))
story.append(paragraph(career["headline"], "contact"))
story.append(paragraph(
    f'<a href="mailto:{site["email"]}">{site["email"]}</a> | '
    f'<a href="{site["url"]}">levihuff.net</a> | '
    f'<a href="{site["social"]["github"]}">github.com/lh1207</a> | '
    f'<a href="{site["social"]["linkedin"]}">LinkedIn</a>', "contact", raw=True))
story.append(paragraph(career["location"]["base"], "contact"))
story.append(paragraph(career["summary"] + " " + career["seeking"]))
story.append(paragraph(career["location"]["preference"]))

heading("EDUCATION AND CURRENT STUDY")
story.append(paragraph(f'<b>{clean(career["degree"])}</b> | {clean(career["institution"])}', raw=True))
story.append(paragraph(career["study"]))

heading("SUPPORT SKILLS")
for item in skills[0]["items"]:
    story.append(paragraph(f'<b>{clean(item["label"])}</b>: {clean(item["text"])}', raw=True))
story.append(paragraph("PowerShell | Hyper-V, AD DS, DNS and DHCP lab configuration | Docker Compose | Git"))

heading("EXPERIENCE")
for entry in experience[:3]:
    block = [paragraph(entry["company"] + " | " + entry["focusAreas"], "role"), paragraph(entry["description"])]
    if entry["company"] != "Kroger":
        for item in entry.get("highlights", []):
            block.append(paragraph("- " + item))
    story.append(KeepTogether(block))
story.append(paragraph("Additional experience: UC Conference & Event Services, event staff (2023-2024); UC RED Housing, desk assistant (2021)."))

heading("SELECTED TECHNICAL PROJECTS")
story.append(paragraph('<b>Windows and Active Directory lab</b> | Personal project<br/>PowerShell scripts for Hyper-V setup, with recorded AD, DNS and DHCP configuration checks. <a href="https://github.com/lh1207/ad-pxe-lab">github.com/lh1207/ad-pxe-lab</a>', raw=True))
story.append(paragraph('<b>AeroAssist</b> | Software project contributor<br/>Added Docker configuration to an ASP.NET ticketing application. The source includes ticket API operations and SQL Server integration. <a href="https://github.com/lh1207/AeroAssist">github.com/lh1207/AeroAssist</a>', raw=True))

output = ROOT / "src/files/Levi_Huff_Resume.pdf"
document = SimpleDocTemplate(str(output), pagesize=letter, rightMargin=36, leftMargin=36, topMargin=30, bottomMargin=30, title="Levi Huff - IT support resume", author="Levi Huff")
document.build(story)
print(output)
