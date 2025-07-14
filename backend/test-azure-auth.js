const { execSync } = require('child_process');

console.log('Testing Azure CLI authentication...');

try {
  // Test if Azure CLI is available
  const azVersion = execSync('az --version', { encoding: 'utf8' });
  console.log('✅ Azure CLI is available:');
  console.log(azVersion.split('\n')[0]); // Show version line
  
  // Test if we can get account info
  const accountInfo = execSync('az account show', { encoding: 'utf8' });
  const account = JSON.parse(accountInfo);
  console.log('✅ Azure authentication successful:');
  console.log(`   Account: ${account.name}`);
  console.log(`   Subscription: ${account.id}`);
  console.log(`   Tenant: ${account.tenantId}`);
  
} catch (error) {
  console.error('❌ Azure CLI authentication failed:');
  console.error(error.message);
  console.log('\nTo fix this:');
  console.log('1. Run "az login" on your host machine');
  console.log('2. Make sure ~/.azure directory exists and contains your credentials');
  console.log('3. Restart the backend container');
} 