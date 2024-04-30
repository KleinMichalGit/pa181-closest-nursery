# Security Measures

This document outlines the security protocols and measures implemented in our project. Due to the private nature of the repository and its non-association with an Organization, GitHub's automated workflow for security scans is not directly applicable.

To circumvent this, we have integrated the [Snyk CLI](https://snyk.io/) tool, a Static Application Security Testing (SAST) tool, into our security framework. The Snyk CLI is configured to perform a comprehensive scan of the main branch of the repository every 24 hours.

## Scope of Snyk CLI:

- **Open Source Vulnerabilities:** The Snyk CLI is capable of identifying and rectifying vulnerabilities present in open-source libraries and dependencies.
- **Code Vulnerabilities:** The tool is designed to detect and address vulnerabilities in the application code in real time.
- **Code Quality Issues:** It is equipped to identify and rectify bugs, code smells, performance issues, and maintainability issues.
- **Container Vulnerabilities:** The Snyk CLI can identify and rectify vulnerabilities in container images and Kubernetes applications.
- **Infrastructure as Code Vulnerabilities:** The tool is capable of identifying and rectifying insecure configurations in Terraform and Kubernetes code.