# Contributing to Vaadin + shadcn/ui Integration Framework

## 🎯 Project Purpose

This is a **demonstration framework** showcasing Vaadin + shadcn/ui integration patterns. Contributions should focus on improving the demonstration value and integration examples.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/toolbox.git`
3. **Run locally**: `./mvnw spring-boot:run`
4. **Make changes** and test thoroughly
5. **Submit a pull request**

## 🎨 Contribution Areas

### High Priority
- **Integration Examples**: New Vaadin + shadcn/ui component combinations
- **RBAC Enhancements**: Permission system improvements
- **Documentation**: Better integration guides and examples
- **Testing**: Additional E2E test scenarios

### Medium Priority
- **Performance**: Optimization of integration patterns
- **Accessibility**: Improved WCAG compliance
- **Mobile**: Enhanced responsive design patterns

## 📋 Development Guidelines

### Code Style
- **Java**: Follow Spring Boot conventions
- **TypeScript**: Use functional components with hooks
- **CSS**: Tailwind utility classes preferred
- **Comments**: Focus on integration patterns and "why"

### Integration Patterns
- **Consistent Theming**: Ensure dark/light mode works across both systems
- **Type Safety**: Maintain full TypeScript coverage
- **Accessibility**: Include ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design approach

### Testing Requirements
- **Backend**: Unit tests for new services
- **E2E**: Playwright tests for new user flows
- **Integration**: Test Vaadin + shadcn/ui component interactions

## 🔄 Pull Request Process

1. **Create feature branch**: `git checkout -b feature/your-feature-name`
2. **Follow naming**: `feature/`, `fix/`, `docs/`, `test/`
3. **Write clear commits**: Use conventional commit format
4. **Test thoroughly**: Run `./mvnw verify -Ph2,e2e-test`
5. **Update documentation**: Include relevant docs updates

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Integration patterns are consistent
- [ ] Tests pass (backend + E2E)
- [ ] Documentation updated
- [ ] No breaking changes to existing integrations
- [ ] Accessibility considerations addressed

## 🏷️ Issue Labels

Use appropriate labels for issues and PRs:
- **Integration**: `vaadin`, `shadcn-ui`, `integration`
- **System**: `rbac`, `theme`, `responsive`, `accessibility`
- **Type**: `bug`, `enhancement`, `documentation`, `testing`
- **Priority**: `priority: high/medium/low`

## 🤝 Code Review

### What We Look For
- **Integration Quality**: How well does it demonstrate Vaadin + shadcn/ui patterns?
- **Code Clarity**: Is the integration approach clear and reusable?
- **Documentation**: Are integration patterns well-documented?
- **Testing**: Are new features properly tested?

### Review Process
- **Automated**: CI/CD checks must pass
- **Manual**: Focus on integration patterns and demonstration value
- **Feedback**: Constructive suggestions for improvement

## 📚 Resources

- **[Architecture Guide](ARCHITECTURE.md)**: System design and patterns
- **[RBAC Documentation](RBAC_PERMISSIONS.md)**: Permission system details
- **[Testing Guide](TESTING.md)**: E2E testing approach
- **[Examples](examples/)**: Integration pattern examples

## 🎉 Recognition

Contributors who improve the framework's demonstration value will be:
- **Acknowledged** in release notes
- **Featured** in documentation
- **Credited** for integration patterns

## 📞 Questions?

- **Create an issue** for questions about integration patterns
- **Start a discussion** for broader architectural questions
- **Check examples** for common integration approaches

Thank you for helping improve this Vaadin + shadcn/ui integration demonstration! 🚀