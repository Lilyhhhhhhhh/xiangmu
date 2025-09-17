# 美容店在线预约系统 MVP 版本

一个基于 Next.js 的现代化美容预约系统前端应用，提供用户注册、登录、服务预约和预约管理功能。

## 🚀 功能特性

### 用户功能
- ✅ 用户注册和登录
- ✅ 浏览美容服务
- ✅ 在线预约服务
- ✅ 选择预约日期和时间
- ✅ 预约确认和管理
- ✅ 查看预约历史

### 技术特性
- 🎨 现代化 UI 设计（Tailwind CSS）
- 📱 完全响应式布局
- 🔐 用户认证系统
- 💾 本地数据存储（模拟后端）
- 🎯 组件化架构
- ⚡ 性能优化

## 🛠️ 技术栈

- **前端框架**: Next.js 15
- **UI 框架**: React 19
- **样式**: Tailwind CSS 3
- **状态管理**: React Hooks + Context API
- **数据存储**: LocalStorage（模拟）
- **构建工具**: Next.js 内置

## 📦 安装和运行

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖
```bash
cd meirong2
npm install
```

### 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本
```bash
npm run build
npm start
```

## 📁 项目结构

```
meirong2/
├── components/           # 组件目录
│   ├── auth/            # 认证相关组件
│   ├── booking/         # 预约相关组件
│   ├── common/          # 通用组件
│   └── layout/          # 布局组件
├── hooks/               # 自定义 Hooks
├── pages/               # 页面目录
│   ├── booking/         # 预约相关页面
│   ├── _app.js         # 应用入口
│   ├── index.js        # 首页
│   ├── login.js        # 登录页
│   ├── register.js     # 注册页
│   ├── services.js     # 服务列表页
│   └── my-bookings.js  # 我的预约页
├── styles/              # 样式文件
├── utils/               # 工具函数
└── public/              # 静态资源
```

## 🎯 主要页面

### 1. 首页 (`/`)
- 展示品牌介绍
- 服务概览
- 快速预约入口

### 2. 服务列表 (`/services`)
- 浏览所有可用服务
- 服务分类筛选
- 服务详情展示

### 3. 预约流程 (`/booking`)
- 选择预约日期
- 选择预约时间
- 预约信息确认

### 4. 我的预约 (`/my-bookings`)
- 查看预约历史
- 预约状态管理
- 预约详情查看

### 5. 用户认证
- 用户注册 (`/register`)
- 用户登录 (`/login`)

## 🔧 核心组件

### 认证系统
- `useAuth` Hook: 用户认证状态管理
- `ProtectedRoute`: 路由保护组件
- 本地存储用户信息

### 预约系统
- `DateSelector`: 日期选择器
- `TimeSelector`: 时间选择器
- `StepIndicator`: 步骤指示器

### 通用组件
- `Button`: 按钮组件
- `Input`: 输入框组件
- `Card`: 卡片组件
- `Modal`: 模态框组件
- `Toast`: 消息提示组件

## 📝 测试账号

为了方便测试，系统预设了测试账号：

```
手机号：13800138000
密码：password123
```

## 🎨 设计系统

### 颜色主题
- 主色调：粉色系 (`primary-500: #ec4899`)
- 辅助色：灰色系
- 状态色：成功绿、警告黄、错误红

### 组件规范
- 统一的间距系统
- 一致的圆角和阴影
- 响应式断点设计

## 📱 响应式设计

支持以下设备：
- 📱 移动设备 (320px+)
- 📟 平板设备 (768px+)
- 💻 桌面设备 (1024px+)

## 🔮 未来扩展

### 计划功能
- [ ] 后端 API 集成 (Supabase)
- [ ] 实时预约冲突检测
- [ ] 邮件/短信通知
- [ ] 在线支付功能
- [ ] 预约修改和取消
- [ ] 用户评价系统
- [ ] 多门店支持
- [ ] 管理后台

### 技术优化
- [ ] PWA 支持
- [ ] 服务端渲染优化
- [ ] 图片懒加载
- [ ] 代码分割优化

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

如有问题或建议，请联系：
- 邮箱：info@beauty-booking.com
- 电话：400-123-4567

---

**注意**: 这是 MVP 版本，主要用于功能验证和用户体验测试。生产环境使用前请集成真实的后端服务。