// Single source of truth for infrastructure projects, homelab services, and
// the secondary AI ops layer. Each entry renders as a card (via
// components/infra-card.njk) and a detail page at /infrastructure/<slug>/
// (via src/infrastructure/entry.njk). To add a new project or service,
// append one object here. Nothing else changes.
//
// section: "infrastructure" | "homelab" | "ai-ops"
// kind:    "project" | "service"
// featured entries surface on the homepage.

module.exports = [
  // ── Infrastructure projects ────────────────────────────────────────────
  {
    slug: "windows-imaging-zero-touch",
    name: "Windows imaging and zero-touch deployment",
    section: "infrastructure",
    kind: "project",
    role: "Built and ran at two employers",
    stack: ["MDT", "WDS", "SCCM", "PXE", "DISM", "FOG Project"],
    status: "Production at two employers",
    summary:
      "Imaging pipelines that took Windows deployment from a manual, two-hour job to an automated process measured in minutes.",
    details: [
      {
        label: "Tire Discounters",
        text: "Built an MDT imaging pipeline with automated Lenovo driver injection and domain enrollment, reducing Windows 11 deployment from 2 hours to under 20 minutes per machine. Standardized GPO across HQ and regional offices."
      },
      {
        label: "Total Quality Logistics",
        text: "Provisioned 50+ workstations via a PXE boot pipeline with department-specific images for a 10,000+ employee Fortune 500 brokerage, including the pre-imaging checklist for I/O verification and BIOS configuration."
      },
      {
        label: "Tooling",
        text: "MDT, Windows Deployment Services, SCCM, PXE, DISM, and FOG Project across enterprise and lab environments."
      }
    ],
    links: [
      { label: "Tire Discounters write-up", url: "/blog/tire-discounters-it-support/" },
      { label: "TQL write-up", url: "/blog/total-quality-logistics-experience/" }
    ],
    featured: true
  },
  {
    slug: "ad-provisioning-automation",
    name: "Active Directory provisioning automation",
    section: "infrastructure",
    kind: "project",
    role: "Designed and shipped",
    stack: ["PowerShell", "Active Directory", "Group Policy", "Windows Server"],
    status: "Production at Tire Discounters",
    summary:
      "PowerShell automation for Active Directory user provisioning that cut manual onboarding setup time by 40% across a 1,200+ employee, 180+ location organization.",
    details: [
      {
        label: "Problem",
        text: "New-hire setup was manual and inconsistent across an organization with 1,200+ employees and 180+ locations."
      },
      {
        label: "Build",
        text: "Engineered PowerShell scripts for AD account provisioning and improved the onboarding documentation so system handoffs were clear for the next technician."
      },
      {
        label: "Result",
        text: "Cut manual onboarding setup time by 40% and standardized Group Policy configuration across HQ and regional offices."
      }
    ],
    links: [
      { label: "Full write-up", url: "/blog/tire-discounters-it-support/" }
    ],
    featured: true
  },
  {
    slug: "imaging-lab",
    name: "Imaging lab",
    section: "infrastructure",
    kind: "project",
    role: "Built and maintain",
    stack: ["FOG Project", "VMware Workstation Pro", "PXE"],
    status: "Active lab",
    summary:
      "A personal imaging lab built on FOG Project and VMware Workstation Pro for testing capture, deployment, and PXE boot workflows outside production.",
    details: [
      {
        label: "Purpose",
        text: "A safe place to test image capture, driver handling, and PXE boot workflows before they touch any real environment."
      },
      {
        label: "Setup",
        text: "FOG Project as the imaging server with VMware Workstation Pro providing disposable client VMs for capture and deploy cycles."
      }
    ],
    links: [],
    featured: true
  },

  // ── Homelab ────────────────────────────────────────────────────────────
  {
    slug: "proxmox-node",
    name: "Proxmox homelab node",
    section: "homelab",
    kind: "project",
    role: "Built and operate",
    stack: ["Proxmox", "Docker", "Dell Optiplex"],
    status: "Running 24/7",
    summary:
      "A Proxmox node on a Dell Optiplex that hosts the whole self-hosted stack: Jellyfin, Pi-hole, Home Assistant, Homebridge, BookStack, and Uptime Kuma.",
    details: [
      {
        label: "Platform",
        text: "Proxmox VE on a Dell Optiplex, with services consolidated from individual LXC containers into a unified Docker stack."
      },
      {
        label: "Resilience",
        text: "Subnet static routing isolates household service availability from upstream failures."
      }
    ],
    links: [],
    featured: true
  },
  {
    slug: "tailscale-remote-access",
    name: "Tailscale remote access",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Tailscale", "WireGuard"],
    status: "Running",
    summary:
      "Secure remote access to every homelab service over a WireGuard-based mesh network, with nothing exposed to the public internet.",
    details: [
      {
        label: "Function",
        text: "Provides authenticated, encrypted access to homelab services from anywhere without opening inbound ports."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "pi-hole",
    name: "Pi-hole",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Pi-hole", "DNS", "Docker"],
    status: "Running",
    summary:
      "Network-wide DNS filtering for every device on the LAN, deployed in the Docker stack on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Acts as the local DNS resolver and blocks ads and trackers at the network level for all household devices."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "jellyfin",
    name: "Jellyfin",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Jellyfin", "Docker"],
    status: "Running",
    summary:
      "Self-hosted media server running in the Docker stack on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Streams a personal media library to household devices without relying on third-party services."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "home-assistant",
    name: "Home Assistant",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Home Assistant", "Docker"],
    status: "Running",
    summary:
      "Home automation hub running in the Docker stack on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Central control point for smart-home devices and automations, kept local instead of cloud-dependent."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "homebridge",
    name: "Homebridge",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Homebridge", "Docker"],
    status: "Running",
    summary:
      "Bridges non-HomeKit smart devices into Apple HomeKit, running alongside Home Assistant on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Exposes devices without native HomeKit support to Apple Home so the whole household can use one interface."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "bookstack",
    name: "BookStack",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["BookStack", "Docker"],
    status: "Running",
    summary:
      "Self-hosted documentation wiki for homelab runbooks and notes, running in the Docker stack on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Holds the runbooks, service notes, and rebuild instructions for the rest of the homelab. Documentation is part of the build, not an afterthought."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "uptime-kuma",
    name: "Uptime Kuma",
    section: "homelab",
    kind: "service",
    role: "Run and maintain",
    stack: ["Uptime Kuma", "Docker"],
    status: "Running",
    summary:
      "Uptime monitoring for every homelab service, running in the Docker stack on the Proxmox node.",
    details: [
      {
        label: "Function",
        text: "Watches each service and alerts on outages, so problems are found by monitoring instead of by users."
      }
    ],
    links: [],
    featured: false
  },

  // ── AI ops: the staying-current layer, intentionally secondary ─────────
  {
    slug: "local-llm-stack",
    name: "Local LLM stack",
    section: "ai-ops",
    kind: "project",
    role: "Built and operate",
    stack: ["Ollama", "Open WebUI", "Docker"],
    status: "Running",
    summary:
      "Self-hosted LLM inference with Ollama and Open WebUI, deployed with Docker. Same discipline as the rest of the homelab: containerized, documented, monitored.",
    details: [
      {
        label: "Function",
        text: "Local model inference and a web front end for experimenting with models without sending data to third-party services."
      }
    ],
    links: [],
    featured: false
  },
  {
    slug: "openclaw-deployment",
    name: "OpenClaw deployment",
    section: "ai-ops",
    kind: "project",
    role: "Deployed and documented",
    stack: ["OpenClaw", "WSL2", "Windows"],
    status: "Documented",
    summary:
      "Deployed OpenClaw and wrote up the process, including the parts that did not work on the first try.",
    details: [
      {
        label: "Write-up",
        text: "Full deployment walkthrough on the blog, covering setup on Windows with WSL2."
      }
    ],
    links: [
      { label: "Deployment write-up", url: "/blog/deploying-openclaw-windows-wsl2/" }
    ],
    featured: false
  },
  {
    slug: "multi-model-workflow",
    name: "Multi-model dev workflow",
    section: "ai-ops",
    kind: "project",
    role: "Designed and use daily",
    stack: ["Claude Code", "Codex", "Gemini", "Ollama"],
    status: "In daily use",
    summary:
      "A development workflow that routes tasks across multiple AI tools by strength, documented with real failure cases.",
    details: [
      {
        label: "Design",
        text: "Tasks routed by model strength: orchestration and writing, async review, and large-context analysis handled by different tools."
      }
    ],
    links: [
      { label: "Workflow write-up", url: "/blog/rebuilding-my-dev-setup-with-three-llms/" }
    ],
    featured: false
  }
];
