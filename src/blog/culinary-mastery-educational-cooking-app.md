---
title: Culinary Mastery - Building an Educational Cooking Platform
description: A senior design project creating an accessible educational app for teaching foundational cooking skills through video tutorials and interactive learning
date: 2025-01-20
tags: [full-stack, education, web-development, senior-design, react-native, azure]
layout: post.njk
---

# Culinary Mastery - Building an Educational Cooking Platform

Culinary Mastery is a web-based educational app that teaches foundational cooking skills through video tutorials, interactive quizzes, and personalized learning paths. I worked on this as part of the University of Cincinnati Senior Design program. The project fills a gap in accessible cooking education by using modern web technologies with secure backend services.

## Project Overview

I worked on this with Senior Design Group 7 at the University of Cincinnati during Fall 2024 and Spring 2025. The project creates a learning platform that goes beyond recipes, teaching fundamental techniques, safety practices, and cooking vocabulary.

**Repository:** [Culinary Mastery on GitHub](https://github.com/24-25-UC-Senior-Design-Group-7/Culinary-Mastery)  
**IT Expo 2025:** [Featured Project - Team 7](https://itexpo.live/2025/seniors/280)

## IT Expo 2025 Recognition

Culinary Mastery was featured at the University of Cincinnati IT Expo 2025, where it was presented as Team 7's senior design project in the "Everyday Living Innovations" category. The IT Expo showcases innovative technology projects developed by students, providing an opportunity to present work to industry professionals, faculty, and peers.

At IT Expo, we presented how the app tackles real problems people face when learning to cook. As noted in the [IT Expo abstract](https://itexpo.live/2025/seniors/280), users often struggle with cooking terms (like "sear") and worry about produce going bad. The app helps users learn the skills, vocabulary, and ingredient knowledge they need to cook confidently at home.

At IT Expo, we showed the technical work, user experience design, and how it could help people feel more confident cooking and eat better. Being featured there shows the project successfully combined solid technical work with solving real problems.

## The Problem

Research indicates that many people, particularly young adults, lack confidence in cooking. Studies show that only about 62.5% of students feel capable of preparing meals from basic ingredients. As highlighted in the [IT Expo presentation](https://itexpo.live/2025/seniors/280), test groups frequently reported concerns about:

- Not understanding cooking terminology used in recipes (e.g., terms like "sear")
- Produce wasting too quickly, leading to financial concerns
- Feeling that cooking results in wasted money and wasted time
- Lack of confidence in cooking techniques and ingredient knowledge

Existing learning resources often have poor video quality, weak security, limited accessibility, or aren't very interactive. We built Culinary Mastery to fix these issues and make it useful for people from different backgrounds, including cooking techniques from around the world.

Culinary Mastery helps by providing:
- High-quality video content through YouTube API integration
- Secure data storage and user authentication
- Comprehensive accessibility features
- Interactive learning experiences with quizzes and progress tracking

## Technical Architecture

### Frontend
- **React Native**: Cross-platform mobile and web application development
- **Responsive Design**: Ensures usability across devices and screen sizes
- **Accessibility Features**: Screen reader compatibility, high-contrast themes, multilingual support

### Backend
- **Node.js**: Server-side development and API services
- **Azure Cosmos DB**: Scalable NoSQL database for user data and course content
- **Azure Blob Storage**: Secure storage for video files and media assets
- **Firebase & Azure Authentication**: Secure user authentication with two-factor authentication (2FA) support

### API Integration
- **YouTube API**: Video hosting and streaming for tutorial content - videos are selected for quality and accuracy
- **AI/LLM Integration**: Backend integration with AI services for generating written explanations and translations. This was included to learn how AI is being integrated into modern workflows, understand practical use cases, and explore how Azure handles AI services. The AI functionality is completely backend—users don't interact with it directly, and it's not marketed as an "AI feature."

## Key Features

### Video-Based Learning
The app uses the YouTube API to deliver video tutorials. Each course includes:
- Step-by-step instructional videos
- Closed captions and subtitles for accessibility
- Vocabulary and technique explanations
- Safety information and best practices

### Interactive Learning Components
- **Quizzes**: Assessment tools to reinforce learning
- **Progress Tracking**: User progress monitoring across courses
- **Personalized Feedback**: Adaptive learning paths based on user performance
- **Community Features**: Forums for user interaction and knowledge sharing

### Security and Accessibility
The project implements comprehensive security measures:
- Encryption for user data protection
- Compliance with GDPR and CCPA regulations
- Following OWASP, NIST, and CISA security best practices
- Two-factor authentication support

Accessibility features include:
- Screen reader compatibility
- High-contrast themes
- Multilingual support
- Alternative text for images
- Keyboard navigation support

## My Contributions

As a member of the software application development team (alongside Guy-Leroc Ossebi and Jackson Pinchot), my contributions included:

### Development Responsibilities
- **Frontend Development**: Building user interface components for video playback, course navigation, and interactive elements
- **Backend Integration**: Configuring Node.js services and integrating with Azure cloud services
- **API Integration**: Implementing YouTube API integration for video content delivery
- **Database Design**: Contributing to data modeling and Azure Cosmos DB schema design

### Collaboration and Planning
- Participating in Agile/Scrum development methodology with two-week sprints
- Contributing to UI/UX design decisions and wireframing
- Collaborating on content creation and course structure
- Participating in code reviews and quality assurance

### Technical Implementation
- Implementing responsive design patterns for cross-device compatibility
- Ensuring accessibility standards are met throughout the application
- Contributing to authentication and security implementation
- Optimizing video streaming and content delivery
- Integrating AI/LLM services in the backend to learn current technology trends and understand how AI fits into real-world applications

## Development Timeline

The project followed an Agile development methodology with structured sprints:

### Fall 2024
- Brainstorming and planning phases
- UI/UX design and wireframing
- Prototyping and initial development
- Deployment preparation

### Spring 2025
- Continued development and feature implementation
- IT Expo preparation and presentation
- Final development sprints
- Project completion and documentation

## AI Integration and Learning Objectives

We decided to include AI/LLM integration in the backend for several reasons:

### Why Include AI?

AI is becoming part of daily workflows across many industries. Rather than treating it as a marketing buzzword, we wanted to learn how to actually integrate AI into real projects. The decision was based on:

- **Current Technology Trends**: AI and LLMs are increasingly common in software development, and understanding them is becoming essential
- **Practical Learning**: We wanted hands-on experience with AI integration, not just theory
- **Backend Implementation**: The AI functionality is completely backend—users never see or interact with it directly. It's not advertised as an "AI-powered" feature
- **Azure AI Services**: Learning how Azure handles AI services and what tools are available
- **Use Case Exploration**: Understanding when and how AI makes sense in applications

The AI integration handles tasks like generating written explanations and translations behind the scenes. This approach let us learn about AI integration, explore practical use cases, and understand how cloud platforms like Azure support AI services, all while keeping the user experience focused on learning to cook, not on AI features.

## Challenges and Solutions

### Video Content Delivery
**Challenge**: Ensuring reliable video streaming with good performance across different network conditions.

**Solution**: Using the YouTube API for content delivery, which handles streaming and CDN capabilities for us.

### Scalable Data Storage
**Challenge**: Designing a database schema that can scale with growing user base and content library.

**Solution**: Using Azure Cosmos DB, which can scale horizontally and distribute data globally.

### Security and Compliance
**Challenge**: Implementing comprehensive security measures while maintaining user experience.

**Solution**: Following best practices from OWASP, NIST, and CISA, including encryption, secure authentication, and compliance with data protection regulations.

## Technologies and Tools

- **Languages**: JavaScript, HTML, CSS
- **Frameworks**: React Native, Node.js
- **Cloud Services**: Azure Cosmos DB, Azure Blob Storage, Azure Authentication, Azure AI services
- **APIs**: YouTube API, AI/LLM APIs (backend integration)
- **Authentication**: Firebase, Azure Authentication
- **Development Tools**: Git, GitHub, ESLint

## Project Impact

Culinary Mastery aims to:
- Increase cooking confidence among users
- Improve dietary outcomes through better cooking skills
- Provide accessible learning resources for diverse audiences
- Support continuous learning and skill development

## Lessons Learned

This project provided valuable experience in:
- Full-stack development across frontend and backend
- Cloud service integration and management
- API integration and third-party service utilization
- Backend AI/LLM integration and understanding practical use cases
- How Azure handles AI services and what tools are available
- Accessibility implementation in web applications
- Agile development methodology and team collaboration
- Security best practices in application development

## Future Enhancements

Potential future improvements include:
- Expanded course content and tutorial library
- Enhanced multilingual support
- Further exploration of backend AI use cases
- Community features and user-generated content
- Mobile app optimization and offline capabilities
- Integration with nutrition tracking and meal planning

## Conclusion

Culinary Mastery combines modern web development with accessibility, security, and good user experience. The project let me apply full-stack development skills to build an educational platform.

Working on this senior design project taught me a lot about working on a team, using cloud services, and building apps that solve real problems. One of the most valuable aspects was learning how to integrate AI/LLM services in the backend—not as a marketing feature, but as a practical tool. Understanding how Azure handles AI services, exploring real use cases, and implementing AI integration helped me see how AI is becoming part of everyday development workflows. Focusing on accessibility and security from the start reinforced how important inclusive design and secure development are.

For more information about the project:
- [Culinary Mastery repository on GitHub](https://github.com/24-25-UC-Senior-Design-Group-7/Culinary-Mastery)
- [IT Expo 2025 project page](https://itexpo.live/2025/seniors/280)
