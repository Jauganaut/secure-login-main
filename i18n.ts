
export type Language = 'en' | 'zh';

export const translations = {
  en: {
    login: "Sign In",
    account: "Account Login",
    dingtalk: "DingTalk Login",
    username: "Username/Email",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot Password?",
    agreement: "I agree to the Privacy Policy",
    scanning: "Scan to sign in",
    securityTitle: "Security Access Denied",
    securityMsg: "Your connection was flagged for suspicious activity. Please refresh.",
    refresh: "Refresh Page",
    official: "Official Website",
    help: "Help Center",
    client: "Client Apps",
    admin: "Administrator Login"
  },
  zh: {
    login: "登 录",
    account: "账号登录",
    dingtalk: "钉钉扫码登录",
    username: "邮箱账号/手机号",
    password: "请输入密码",
    remember: "记住账号",
    forgot: "忘记密码？",
    agreement: "我已阅读并同意隐私政策和产品服务协议",
    scanning: "使用移动端扫码登录",
    securityTitle: "安全访问受限",
    securityMsg: "您的连接因异常活动被拦截。如果您是真实用户，请刷新重试。",
    refresh: "刷新页面",
    official: "官方网站",
    help: "帮助中心",
    client: "客户端下载",
    admin: "管理员登录"
  }
};

export function detectIsChina(): boolean {
  try {
    const lang = navigator.language.toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Check for Chinese language setting
    if (lang.includes('zh')) return true;
    
    // Check for China/HK/Macau timezones
    const chinaTimezones = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Urumqi', 'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Taipei'];
    if (chinaTimezones.includes(tz)) return true;
    
    return false;
  } catch (e) {
    return false;
  }
}
