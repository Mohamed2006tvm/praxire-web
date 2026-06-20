import { allServices as originalServices } from './servicesData';

export const serviceCategories = [
  { id: 'all', label: '所有服务' },
  { id: 'software-development', label: '软件开发' },
  { id: 'application-development', label: '应用开发' },
  { id: 'technology-services', label: '技术服务' },
  { id: 'quality-devops', label: '质量与 DevOps' },
];

export const allServices = originalServices.map((service) => {
  switch (service.id) {
    case 'software-consulting':
      return {
        ...service,
        title: '软件咨询',
        description: '战略技术咨询服务，旨在使您的 IT 路线图与业务目标保持一致，降低风险并加速数字化转型。',
        features: ['技术评估', '架构规划', '厂商选择', '路线图设计'],
      };
    case 'erp-software-development':
      return {
        ...service,
        title: 'ERP 软件开发',
        description: '定制企业资源计划系统，将您的财务、人力资源、供应链和库存运营统一到一个平台中。',
        features: ['模块定制', '工作流自动化', '实时报告', '第三方集成'],
      };
    case 'custom-crm-development':
      return {
        ...service,
        title: '定制 CRM 开发',
        description: '量身定制的客户关系管理系统，旨在管理线索、自动执行销售管道并提高客户留存率。',
        features: ['线索管理', '销售管道', '客户分析', '营销自动化'],
      };

    case 'product-development':
      return {
        ...service,
        title: '产品开发',
        description: '从构思到发布端到端的产品工程——包括 MVP 开发、迭代周期和市场就绪发布。',
        features: ['MVP 策略', '敏捷冲刺', '用户测试', '进入市场支持'],
      };
    case 'maintenance-support':
      return {
        ...service,
        title: '维护与支持',
        description: '持续的应用程序支持、Bug 修复、性能优化和基础设施监控，确保系统 24/7 运行。',
        features: ['24/7 监控', 'Bug 解决', '性能调优', '安全补丁'],
      };
    case 'web-application':
      return {
        ...service,
        title: 'Web 应用开发',
        description: '使用 React、Next.js 和 Node.js 构建的全栈 Web 应用程序——针对性能、可访问性和可扩展性进行了优化。',
        features: ['响应式设计', '渐进式 Web 应用', 'REST & GraphQL API', '实时功能'],
      };
    case 'custom-application':
      return {
        ...service,
        title: '定制应用开发',
        description: '从头开始构建的定制软件，用于解决现成产品无法解决的独特业务挑战。',
        features: ['需求分析', '自定义架构', '可扩展后端', '企业级安全'],
      };
    case 'application-modernization':
      return {
        ...service,
        title: '应用现代化',
        description: '使用最新的框架和迁移策略，将遗留系统转型为现代、云原生的应用程序。',
        features: ['遗留迁移', '代码重构', '云原生转换', '技术栈升级'],
      };
    case 'application-management':
      return {
        ...service,
        title: '应用管理',
        description: '全面的应用生命周期管理，包括监控、优化、事件响应和持续改进。',
        features: ['生命周期管理', '事件响应', 'SLA 管理', '持续改进'],
      };
    case 'application-maintenance':
      return {
        ...service,
        title: '应用维护',
        description: '主动维护服务，确保您的应用程序保持安全、更新并以最高效率运行。',
        features: ['预防性维护', '版本升级', '兼容性测试', '备份与恢复'],
      };
    case 'cloud-application':
      return {
        ...service,
        title: '云应用开发',
        description: '在 AWS、Azure 或 GCP 上构建的云优先应用，采用无服务器、容器化和自动伸缩架构。',
        features: ['无服务器函数', '容器部署', '自动伸缩', '多区域部署'],
      };
    case 'application-integration':
      return {
        ...service,
        title: '应用集成',
        description: '将不同的业务系统、第三方 API 和数据源无缝连接到一个统一的、可互操作的生态系统中。',
        features: ['API 开发', '数据同步', '中间件解决方案', 'iPaaS 集成'],
      };
    case 'ecommerce-application':
      return {
        ...service,
        title: '电子商务应用',
        description: '具有安全支付网关、库存管理和转化优化结账流程的可扩展在线商店。',
        features: ['支付集成', '库存系统', '移动电商', '分析仪表板'],
      };
    case 'mobile-app-development':
      return {
        ...service,
        title: '移动应用开发',
        description: '使用 React Native 和 Flutter 构建的原生 iOS/Android 和跨平台移动应用，实现最大覆盖面和性能。',
        features: ['跨平台', '原生性能', '推送通知', '离线支持'],
      };
    case 'hire-dedicated-developers':
      return {
        ...service,
        title: '雇用专属开发人员',
        description: '通过精通 React、Node.js、Python、Java 等技术的全职专属开发人员来增强您的团队。',
        features: ['预筛选工程师', '灵活的合作模式', '每日立会', '知识产权保护'],
      };
    case 'full-stack-development':
      return {
        ...service,
        title: '全栈开发',
        description: '使用现代技术栈（React、Node.js、Python、PostgreSQL、MongoDB 等）进行完整的前端到后端开发。',
        features: ['前端和后端', '数据库设计', 'API 架构', '部署与 CI/CD'],
      };
    case 'saas-development':
      return {
        ...service,
        title: 'SaaS 开发',
        description: '具有订阅计费、基于角色的访问、使用分析和白标定制的多租户 SaaS 平台。',
        features: ['多租户', '订阅计费', '使用分析', '白标选项'],
      };

    case 'ux-ui-design':
      return {
        ...service,
        title: 'UX/UI 设计',
        description: '以用户为中心的设计服务——从线框图到高保真原型——确保您的产品直观且吸引人。',
        features: ['用户研究', '线框图设计', '原型设计', '设计系统'],
      };

    case 'qa-testing':
      return {
        ...service,
        title: 'QA 与测试',
        description: '全面的测试服务——手动、自动、性能和安全测试——以交付无 Bug、可靠的软件。',
        features: ['自动化测试', '性能测试', '安全审计', '回归测试'],
      };

    default:
      return service;
  }
});
