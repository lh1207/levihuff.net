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
    "featured": true,
    "diagram": {
      "src": "/images/infrastructure/windows-lab.svg",
      "width": 1100,
      "height": 800,
      "alt": "Hyper-V lab with DC01 domain services, WDS01 transport, CL02, and planned CM01, CL01 and REF01 roles.",
      "caption": "Documented Windows lab architecture, reviewed November 2, 2026. Network connections describe the design, not which VMs are running. Configuration Manager and later imaging work remain planned. The page scope remains initial setup and configuration checks.",
      "sources": [
        {
          "label": "Architecture source",
          "url": "https://github.com/lh1207/ad-pxe-lab/blob/main/docs/architecture.md"
        },
        {
          "label": "Dated execution records",
          "url": "https://github.com/lh1207/ad-pxe-lab/blob/main/docs/lab-notebook.md"
        }
      ]
    }
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
        "text": "October 18–19 migration records place Pi-hole, BookStack, Jellyfin, Homebridge, and Uptime Kuma in Docker LXC CT 105. Home Assistant remains in VM 101. Open WebUI and Ollama share a Docker network; authenticated chat was not verified."
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
    "featured": true,
    "diagram": {
      "src": "/images/infrastructure/homelab.svg",
      "width": 1100,
      "height": 800,
      "alt": "Proxmox contains Docker LXC CT 105, Home Assistant VM 101 and five archived LXCs; Mac Caddy routes web requests to Docker services.",
      "caption": "Documented homelab topology from October 18–19, 2026 migration records. Selected services are shown, not live availability. The five old service LXCs are stopped and retained for rollback. Client-local HTTPS names do not provide general LAN DNS.",
      "sources": [
        {
          "label": "Topology and migration records",
          "url": "https://github.com/lh1207/homelab/blob/main/README.md"
        }
      ]
    }
  }
];
