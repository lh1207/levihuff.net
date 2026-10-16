// Personal lab artifacts only. Career duties live in experience.json.
module.exports = [
  {
    "slug": "imaging-lab",
    "name": "Windows and Active Directory lab",
    "section": "infrastructure",
    "kind": "project",
    "role": "Personal lab and PowerShell scripts",
    "stack": [
      "Hyper-V",
      "Windows Server",
      "Active Directory",
      "PowerShell",
      "DNS",
      "DHCP"
    ],
    "status": "Personal lab · Configuration and execution records",
    "summary": "PowerShell scripts for a Hyper-V lab, with recorded Active Directory, DNS, and DHCP configuration checks.",
    "details": [
      {
        "label": "Implementation",
        "text": "Scripts check host readiness and create the virtual switch, parent disks, and virtual machines. The repository includes a dated domain-controller verification transcript."
      },
      {
        "label": "Scope",
        "text": "The recorded checks cover the initial lab and domain-controller setup. WDS/PXE deployment runbooks are included as lab instructions, separate from evidence of completed deployment."
      },
      {
        "label": "Context",
        "text": "A personal learning environment, separate from my earlier employer support work."
      }
    ],
    "links": [
      {
        "label": "Source and runbooks",
        "url": "https://github.com/lh1207/ad-pxe-lab"
      },
      {
        "label": "Configuration verification",
        "url": "https://github.com/lh1207/ad-pxe-lab/blob/main/docs/phase-02-configuration-verification.txt"
      }
    ],
    "featured": true
  },
  {
    "slug": "proxmox-node",
    "name": "Homelab service configuration",
    "section": "homelab",
    "kind": "project",
    "role": "Personal configuration repository",
    "stack": [
      "Docker Compose",
      "Proxmox"
    ],
    "status": "Version-controlled configuration",
    "summary": "Docker Compose definitions and host notes for a personal homelab, including media, home automation, and monitoring services.",
    "details": [
      {
        "label": "Configuration",
        "text": "The repository includes Compose definitions for Jellyfin, Homebridge, Uptime Kuma, and Open WebUI."
      },
      {
        "label": "Topology",
        "text": "The host notes distinguish a Docker LXC from separate Pi-hole and BookStack LXCs. Open WebUI is configured to connect to Ollama on a separate host."
      },
      {
        "label": "Scope",
        "text": "Personal configuration and documentation work. These files describe service setup, rather than current availability or uptime."
      }
    ],
    "links": [
      {
        "label": "Configuration repository",
        "url": "https://github.com/lh1207/homelab"
      }
    ],
    "featured": true
  }
];
