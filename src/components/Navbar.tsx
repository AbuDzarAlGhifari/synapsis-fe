import { getUsers } from '@/services/usersApi';
import { useSelectedUserStore } from '@/store/selectedUserStore';

import { useQuery } from '@tanstack/react-query';
import { Select, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');
  const { selectedUserId, setSelectedUserId } = useSelectedUserStore();

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(1, 100),
  });

  if (error) {
    console.error('Failed to fetch users data:', error);
  }

  return (
    <nav className="bg-gradient-to-r from-black to-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
      <div className="font-bold text-xl lg:text-2xl">
        <Link
          href="/"
          className="hover:text-blue-600 transition-all duration-300"
        >
          GoRest
        </Link>
      </div>

      {/* User*/}
      <div className="flex items-center space-x-6">
        {!isDashboard &&
          (isLoading ? (
            <Spin className="text-white" />
          ) : (
            <Select
              placeholder="Select User"
              value={selectedUserId || undefined}
              onChange={(id) => setSelectedUserId(id)}
              options={
                usersData?.users?.map((user) => ({
                  value: user.id,
                  label: user.name,
                })) || []
              }
              className="w-48 bg-white text-gray-100 rounded-md"
            />
          ))}

        {/* Dashboard */}
        <div className="flex space-x-4">
          {isDashboard ? (
            <>
              <Link
                href="/dashboard/user"
                className="hover:text-blue-400 transition-all duration-300"
              >
                User
              </Link>
              <Link
                href="/dashboard/posts"
                className="hover:text-blue-400 transition-all duration-300"
              >
                Posts
              </Link>
              <Link
                href="/dashboard/comments"
                className="hover:text-blue-400 transition-all duration-300"
              >
                Comments
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard/user"
              className="hover:text-blue-400 transition-all duration-300"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
