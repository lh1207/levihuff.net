---
title: IT Support at Tire Discounters
description: How I provided IT support across Cincinnati and Sharonville, cleared a backlogged ticket queue, improved employee onboarding documentation, and built a new MDT image with automated Lenovo driver installation and domain enrollment
date: 2025-03-15
tags: [it-support, mdt, windows-deployment, field-support, systems-administration, process-improvement]
layout: post.njk
thumbnail: /images/blog/onboarding-hero.jpg
---

![Professional reviewing process documentation in office environment](/images/blog/onboarding-hero.jpg)

My role at Tire Discounters was a meaningful step in my professional development, not just technically, but in terms of understanding what a structured corporate IT environment looks and feels like. This post covers the full scope of that work: the support model across locations, clearing a backlogged ticketing system, improving the employee onboarding process, and building a new MDT image that automated Lenovo driver installation and domain controller enrollment.

## A Different Kind of Professional Environment

Coming from experience in a logistics brokerage environment, Tire Discounters was a notable shift in workplace culture. Brokerage environments tend to be high-energy and fast-moving by nature, which has real value, but the pace and culture of those settings can differ significantly from a more traditional corporate office. Tire Discounters gave me the opportunity to develop within a more structured, formal professional setting, one where measured communication, consistent processes, and a composed approach to problem-solving were the standard. That experience shaped how I carry myself in professional contexts and gave me a clearer sense of how to adapt to different workplace cultures.

## Supporting Multiple Locations

Tire Discounters has locations across the Midwest, and the IT support model reflected that geographic spread. My primary base was the main office in Cincinnati, with on-site visits to the Sharonville location when tasks required physical presence. Support for other locations was handled remotely over the phone, which meant being able to diagnose and walk users through issues clearly without being in the room, a skill that requires patience and precise communication.

Each location had its own day-to-day needs, and balancing on-site work with remote support meant staying organized about what required a physical visit versus what could be resolved with a phone call.

## Clearing the Ticketing System

One of the significant challenges I tackled was a backlogged ticketing system. When tickets accumulate without resolution, it creates a compounding problem: new issues get buried under old ones, users lose confidence in the support process, and it becomes harder to prioritize what actually needs attention first.

My approach to working down the backlog involved:

- **Triaging tickets** to identify which issues were blocking users versus which could be batched or handled in parallel
- **Handling tasks on-site when needed**, since some tickets required physical presence to resolve
- **Closing out stale tickets** that had been resolved informally but never marked complete, which cleared noise from the queue
- **Working systematically through the remaining items** to get the backlog to a manageable state

Getting the queue cleared wasn't just about closing numbers. It was about restoring a reliable support process that users could trust.

## Improving Employee Onboarding

Beyond ticket support, I identified opportunities to improve the employee onboarding workflow. The existing process had multiple manual steps and unclear transitions between systems, which caused delays in getting new hires up and running. I worked on documenting and streamlining that process, which involved:

1. **Process Mapping**: Documenting each step from initial hire through system access provisioning
2. **System Analysis**: Identifying all systems involved in the onboarding workflow
3. **Handoff Documentation**: Clarifying responsibilities and transition points between departments
4. **Redundancy Identification**: Finding steps where duplicate data entry could be reduced

The documentation served as a reference for those running the process and helped make onboarding more consistent across departments. New hires were able to reach readiness more quickly once the steps were clearly defined and the handoff points were explicit.

## Building a New MDT Image

The most impactful technical project I completed at Tire Discounters was building a new Microsoft Deployment Toolkit (MDT) image for Windows device deployment. The goal was to eliminate the manual steps that had been slowing down the provisioning process, particularly around driver installation and domain enrollment. The new image also served as the upgrade path to Windows 11, bringing the fleet up to the current OS standard as part of the same deployment process.

### The Problem with the Existing Process

Before the new image, deploying a new Lenovo workstation involved manually handling driver installation after imaging, a time-consuming step that was also prone to inconsistency. Domain controller enrollment was similarly a manual step that had to be completed separately. These gaps meant that a freshly imaged machine still required significant hands-on work before it was ready for a user.

### Automating Lenovo Driver Installation

Lenovo publishes driver packages through their commercial support channels, and MDT provides mechanisms to integrate driver injection directly into the deployment task sequence. I built out the driver repository within MDT and configured the task sequence to automatically detect and apply the correct Lenovo drivers during deployment. This meant that after imaging, the machine had the appropriate drivers for its hardware without any manual intervention.

Getting driver injection right requires attention to detail:

- Drivers need to be organized so MDT can match them to the correct hardware model
- The task sequence needs to be structured so driver injection happens at the right point in the deployment process
- Testing against actual hardware is essential; driver issues often only surface when you run the image on real machines

### Automating Domain Controller Enrollment

I also integrated automatic domain enrollment into the deployment task sequence. Rather than requiring an administrator to manually join each machine to the domain after imaging, the process handled it automatically during deployment. This involved configuring the MDT task sequence with the appropriate domain join credentials and settings so the machine came up already enrolled and ready to apply group policies.

### The Result

With the new image in place, deploying a Lenovo workstation went from a multi-step process with significant manual involvement to a largely automated deployment. The machine would come off the imaging process with correct drivers installed, joined to the domain, on Windows 11, and ready for user setup. This reduced the time required per machine and eliminated a class of deployment errors that had been occurring with the previous approach.

## Key Takeaways

1. **Professional environment shapes professional habits**: Adapting to a formal corporate culture is a skill in itself, and one worth developing deliberately
2. **Remote support demands clear communication**: Resolving issues over the phone requires being precise and patient in a way that on-site work does not
3. **A healthy ticket queue requires active management**: Letting tickets accumulate creates a harder problem than dealing with them consistently
4. **Documentation is foundational**: Clear process documentation reduces ambiguity and makes handoffs consistent
5. **Automation in MDT pays off at scale**: The upfront work of building a reliable image eliminates recurring manual effort across every subsequent deployment

## Conclusion

Tire Discounters was formative in ways that went beyond any single task. Supporting a distributed user base, clearing a backlogged queue, documenting the onboarding process, and building a deployment image that meaningfully improved provisioning all contributed to a well-rounded view of what IT support looks like in a professional corporate environment. It also reinforced that technical skills and professional conduct go hand in hand, and both matter.
