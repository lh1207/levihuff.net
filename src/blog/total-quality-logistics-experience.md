---
title: Machine Lifecycle and PXE Imaging at Total Quality Logistics
description: How I managed machine decommissioning by processor generation, coordinated hardware moves under tight deadlines, and deployed department-specific images via PXE boot at TQL
date: 2024-08-10
tags: [systems-administration, imaging, pxe-boot, it-operations]
layout: post.njk
thumbnail: /images/blog/tql-workstations.jpg
---

![Rows of desktop workstations in an empty office](/images/blog/tql-workstations.jpg)

During my time at Total Quality Logistics (TQL), I worked on the IT team supporting the internal infrastructure that keeps one of the country's largest freight brokerage operations running. The work was fast-paced and deadline-driven. When machines needed to move or be redeployed, there wasn't room for delays. This post covers the three main areas I focused on: managing machine decommissioning, coordinating hardware moves, and deploying machines through PXE boot.

## Recycling Machines

A significant part of the role involved managing hardware at the end of its useful life. TQL phased out machines based on processor generation rather than age alone. When a processor generation no longer met the organization's software or OS requirements, those machines were retired across the board.

In 2021, 4th generation Intel machines were phased out. When Windows 11 launched and raised the minimum hardware bar, 6th generation and older processors were no longer viable; Windows 11 requires at least 8th generation Intel to run officially. That created a larger wave of decommissioning as affected machines were pulled from circulation.

Looking forward, TQL's direction appears to be toward newer Intel processors with AI-focused capabilities, reflecting the broader industry shift toward hardware that can handle on-device AI workloads. 10th generation machines are still in active use, but the procurement strategy is trending newer.

When machines were retired, they were staged for destruction rather than wiped in-house. The physical destruction and data sanitization procedures (degaussing, shredding, and other certified disposal methods covered in CompTIA A+) were handled by the appropriate teams. My role was to get machines correctly identified, tracked, and staged so that handoff happened cleanly.

Some machines arrived pre-imaged directly from Dell, so those could go straight into deployment rather than through the imaging pipeline first.

## Moving Machines Under Deadlines

Hardware moves at TQL weren't leisurely projects. Office reconfigurations, team relocations, and equipment upgrades all came with defined timelines that had to be met to avoid disrupting business operations. Coordinating these moves involved:

- **Planning the logistics** of physically relocating equipment while keeping downtime to a minimum
- **Coordinating with teams** to schedule moves around work schedules and business priorities
- **Tracking progress** against the deadline to catch any blockers early
- **Verifying functionality** after each move to confirm machines were operational before closing out the task

Meeting deadlines in an IT operations context means more than just finishing on time. It means the machines have to actually work when the business needs them. I learned to build verification steps into the process rather than treating the physical move as the finish line.

## PXE Boot Imaging with Department-Specific Images

Machine imaging at TQL used PXE (Preboot Execution Environment) boot to deploy standardized images over the network. Rather than a single generic image, TQL maintained separate images for different departments: broker, accounting, and others, each pre-loaded with the software relevant to that team's workflow. Applying the right image to the right machine was an important part of getting a deployment correct.

### How PXE Boot Works in This Context

PXE boot allows a machine to boot from the network rather than a local drive. When a machine PXE boots, it reaches out to a deployment server, which serves the boot environment and image directly. This means you can image a machine without needing to plug in a USB drive or manually configure anything on the device itself. Just connect it to the network, power it on, and select the appropriate image for deployment.

### Checking I/O Before Imaging

Before any PXE deployment could start, the machine needed to actually be capable of network booting, which sounds obvious until you're holding a laptop with no ethernet port. Checking available I/O before starting saved time. When a machine was missing the necessary ports, a USB-to-ethernet dongle could fill the gap, but not just any dongle would work. The adapter needed UEFI driver support, otherwise the BIOS simply wouldn't see it as a valid boot device and the PXE attempt would fail silently. Having the right dongles on hand and knowing which ones were UEFI-compatible became a practical requirement for keeping deployments moving.

Beyond ethernet, I/O in general needed to be accounted for. Some machines didn't have enough available ports to accommodate everything needed during imaging, so planning around that ahead of time prevented interruptions mid-deployment.

### BIOS Verification

Once I/O was confirmed, BIOS settings needed to be verified. This meant confirming that network boot was enabled and that any settings that would interfere with the deployment process were addressed. BIOS passwords added another consideration. They were typically set after imaging was complete, but part of the process was double-checking that a password wasn't already in place in a way that would block the boot sequence.

### Department Images

Each department image was maintained by the teams responsible for it and contained the software stack that department needed. Deploying the correct image meant the machine came up ready for its intended role without additional software installation afterward. This separation also kept images from becoming bloated with software that particular users would never need.

The workflow for a new or redeployed machine looked roughly like this:

1. Confirm the machine's hardware meets current standards (not a phased-out processor generation)
2. Verify I/O availability and confirm the correct adapter is on hand if needed
3. Verify BIOS settings and confirm no password is blocking network boot
4. PXE boot the machine and select the correct department image
5. Let the deployment run to completion
6. Set the BIOS password if not already applied
7. Verify the machine is functional and ready for the user

For machines arriving pre-imaged from Dell, steps 2 through 5 were already handled, and the machine just needed verification before being put into use.

## Key Takeaways

1. **Hardware lifecycle policy simplifies decisions**: Retiring machines by processor generation rather than case-by-case evaluation makes the process consistent and predictable
2. **Staging for destruction is its own process**: Correctly identifying and tracking machines for disposal is distinct from the disposal itself, and both matter
3. **Department-specific images keep deployments targeted**: Separate images per team mean machines are ready to use without post-deployment software work
4. **Deadline-driven hardware work demands early planning**: Identifying blockers before the move date is the difference between hitting deadlines and missing them

## Conclusion

Working at TQL gave me practical experience with the operational side of IT at scale: managing hardware through its lifecycle, coordinating moves under real deadlines, and deploying machines accurately through a structured imaging pipeline. Understanding how TQL thought about hardware, from procurement standards tied to processor generation to department-specific deployment images to clear handoffs for end-of-life equipment, shaped how I think about IT operations as a system rather than a series of isolated tasks.
