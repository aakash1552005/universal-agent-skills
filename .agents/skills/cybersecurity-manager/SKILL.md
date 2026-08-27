---
name: cybersecurity-manager
description: Cybersecurity management, threat modeling (STRIDE), DevSecOps automated pipelines, OWASP Top 10 mitigation, zero-trust architecture, secrets management, and compliance (SOC2/GDPR/PCI).
---

# Cybersecurity Architecture & DevSecOps Management

Enterprise-grade security controls, automated vulnerability scanning, secure coding practices, and incident response frameworks.

## Security Engineering Pillars

### 1. STRIDE Threat Modeling
| Threat | Mitigation Strategy |
|--------|---------------------|
| **Spoofing** | Mutual TLS, OAuth 2.0 / OIDC, signed JWTs with RS256, MFA |
| **Tampering** | HMAC signatures, TLS 1.3 in transit, database row checksums |
| **Repudiation** | Immutable append-only audit logs (AWS CloudTrail, SIEM) |
| **Information Disclosure** | AES-256-GCM encryption at rest, secrets masking, strict CORS |
| **Denial of Service** | Token bucket rate limiting, Cloudflare WAF, autoscaling |
| **Elevation of Privilege** | Principle of Least Privilege, RBAC + ABAC policy enforcement |

### 2. Automated DevSecOps CI Pipeline
- **SAST (Static Analysis)**: Run Semgrep, Bandit, or SonarQube on every commit.
- **SCA (Dependency Scanning)**: Run `pip-audit`, `npm audit`, Snyk, or Trivy.
- **Secret Detection**: Pre-commit hooks with `gitleaks` or `detect-secrets`.
- **DAST (Dynamic Analysis)**: Automated OWASP ZAP or Strix pentesting in staging.