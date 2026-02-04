/**
 * Utility to detect mail providers via DNS MX records
 * Optimized for China accessibility using Alidns
 */

export async function getMailProviderFromMX(domain: string): Promise<string | null> {
  try {
    // Using Alibaba's DNS-over-HTTPS which is highly reliable in China
    const response = await fetch(`https://dns.alidns.com/resolve?name=${domain}&type=MX`, {
      method: 'GET',
      headers: {
        'Accept': 'application/dns-json',
      },
      // Add timeout for better UX
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error(`DNS query failed: ${response.status}`);
    }
    
    const data = await response.json();

    if (!data.Answer || data.Answer.length === 0) {
      console.log(`No MX records found for domain: ${domain}`);
      return null;
    }

    const mxRecords = data.Answer.map((a: any) => a.data.toLowerCase());
    
    // Provider Signatures
    for (const record of mxRecords) {
      console.log(`Checking MX record: ${record}`);
      
      if (record.includes('mxhichina.com') || record.includes('alidns.com') || record.includes('alibaba')) return 'alibaba';
      if (record.includes('exmail.qq.com') || record.includes('exmail')) return 'exmail';
      if (record.includes('mx.qq.com') || record.includes('qq.com')) return 'qq';
      
      // Distinguish NetEase Variants
      if (record.includes('qiye.163.com') || record.includes('163mx01.mxmail.netease.com')) return 'netease_qiye';
      if (record.includes('netease.com') || record.includes('163.com') || record.includes('126.com') || record.includes('yeah.net')) return 'netease';
      
      if (record.includes('263xmail.com') || record.includes('mx.263.net') || record.includes('263.net')) return '263';
      if (record.includes('mx.sina.com') || record.includes('vip.sina.com') || record.includes('sina.com')) return 'sina';
      if (record.includes('sohumx.sohu.com') || record.includes('sohu.com')) return 'sohu';
      if (record.includes('coremail.cn') || record.includes('coremail.net')) return 'coremail';
      if (record.includes('bossmail.cn') || record.includes('bossmail.com')) return 'bossmail';
      if (record.includes('global-mail.cn') || record.includes('globalmail.cn')) return 'globalmail';
    }

    console.log(`No recognized MX patterns for domain: ${domain}`);
    return null;
  } catch (error) {
    console.warn('DNS MX Lookup via Alidns failed, falling back to string matching:', error);
    return null;
  }
}

/**
 * Basic domain-string fallback detection
 */
export function getThemeByDomain(domain: string): string {
  console.log(`Fallback domain matching for: ${domain}`);
  
  if (!domain) return 'alibaba';
  
  if (domain.includes('qq.com')) return 'qq';
  if (domain.includes('exmail') || domain.includes('tencent')) return 'exmail';
  if (domain.includes('bossmail')) return 'bossmail';
  if (domain.includes('263')) return '263';
  if (domain.includes('sina')) return 'sina';
  if (domain.includes('sohu')) return 'sohu';
  if (domain.includes('qiye.163.com')) return 'netease_qiye';
  if (domain.includes('163.com') || domain.includes('126.com') || domain.includes('yeah.net') || domain.includes('netease')) return 'netease';
  if (domain.includes('global')) return 'globalmail';
  if (domain.includes('coremail')) return 'coremail';
  
  return 'alibaba'; // Default
}