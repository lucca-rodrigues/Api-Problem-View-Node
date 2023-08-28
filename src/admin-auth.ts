// admin-auth.ts
import bcrypt from 'bcrypt';

export const authenticate = async (email: string, password: string) => {
  const adminEmail = 'admin@frstfalconi.com';
  const adminPassword = await bcrypt.hash('&KuV18Bo71#E', 10);

  if (!adminEmail || !adminPassword) {
    return false;
  }

  if (email === adminEmail && await bcrypt.compare(password, adminPassword)) {
    return {
      email,
      title: 'Admin',
    };
  }

  return false;
};
