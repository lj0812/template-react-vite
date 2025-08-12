import { useState, useEffect } from 'react';
import { Search, BookOpen, Lock, Unlock, User, Calendar, CheckCircle, Clock, AlertTriangle, Eye, Settings } from 'lucide-react';

export default function CourseUnlockAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCourseInfo, setShowCourseInfo] = useState(false);
  const usersPerPage = 10;

  // 模拟用户数据
  const mockUsers = [
    {
      id: 1,
      username: 'user001',
      email: 'user001@example.com',
      phone: '138****1234',
      registeredAt: '2024-01-15',
      courseCount: 2,
      courses: ['JavaScript基础教程', 'React进阶开发'],
      lastLoginAt: '2024-08-10'
    },
    {
      id: 2,
      username: 'student123',
      email: 'student123@example.com',
      phone: '186****5678',
      registeredAt: '2024-02-20',
      courseCount: 1,
      courses: ['Python数据分析'],
      lastLoginAt: '2024-08-11'
    },
    {
      id: 3,
      username: 'learner456',
      email: 'learner456@example.com',
      phone: '159****9012',
      registeredAt: '2024-03-10',
      courseCount: 1,
      courses: ['UI/UX设计实战'],
      lastLoginAt: '2024-08-09'
    },
    {
      id: 4,
      username: 'developer789',
      email: 'dev789@example.com',
      phone: '177****3456',
      registeredAt: '2024-04-05',
      courseCount: 3,
      courses: ['JavaScript基础教程', 'React进阶开发', 'Node.js后端开发'],
      lastLoginAt: '2024-08-12'
    },
    {
      id: 5,
      username: 'designer101',
      email: 'design101@example.com',
      phone: '155****7890',
      registeredAt: '2024-05-12',
      courseCount: 2,
      courses: ['UI/UX设计实战', '产品设计思维'],
      lastLoginAt: '2024-08-08'
    },
    {
      id: 6,
      username: 'analyst202',
      email: 'analyst202@example.com',
      phone: '133****2468',
      registeredAt: '2024-06-08',
      courseCount: 1,
      courses: ['Python数据分析'],
      lastLoginAt: '2024-08-07'
    },
    {
      id: 7,
      username: 'manager303',
      email: 'manager303@example.com',
      phone: '188****1357',
      registeredAt: '2024-07-01',
      courseCount: 4,
      courses: ['JavaScript基础教程', 'React进阶开发', '项目管理实战', 'Agile敏捷开发'],
      lastLoginAt: '2024-08-12'
    },
    {
      id: 8,
      username: 'teacher404',
      email: 'teacher404@example.com',
      phone: '166****9876',
      registeredAt: '2024-07-15',
      courseCount: 2,
      courses: ['教学方法论', '在线教育技术'],
      lastLoginAt: '2024-08-11'
    },
    {
      id: 9,
      username: 'student505',
      email: 'student505@example.com',
      phone: '199****5432',
      registeredAt: '2024-08-01',
      courseCount: 1,
      courses: ['JavaScript基础教程'],
      lastLoginAt: '2024-08-12'
    },
    {
      id: 10,
      username: 'expert606',
      email: 'expert606@example.com',
      phone: '144****8765',
      registeredAt: '2024-08-10',
      courseCount: 3,
      courses: ['高级算法设计', '系统架构设计', '代码优化实战'],
      lastLoginAt: '2024-08-12'
    }
  ];

  // 模拟课程数据
  const mockCourses = {
    1: [
      {
        id: 101,
        courseTitle: 'JavaScript 基础教程',
        totalLessons: 20,
        purchaseDate: '2024-07-01',
        unlockedLessons: 12,
        lessons: Array.from({length: 20}, (_, i) => ({
          id: i + 1,
          title: `第${i + 1}课：JavaScript ${i < 12 ? '已学完' : '待解锁'}内容`,
          isUnlocked: i < 12,
          unlockedAt: i < 12 ? `2024-07-${String(i + 2).padStart(2, '0')}` : null
        }))
      },
      {
        id: 102,
        courseTitle: 'React 进阶开发',
        totalLessons: 15,
        purchaseDate: '2024-07-15',
        unlockedLessons: 5,
        lessons: Array.from({length: 15}, (_, i) => ({
          id: i + 1,
          title: `第${i + 1}课：React ${i < 5 ? '已学完' : '待解锁'}内容`,
          isUnlocked: i < 5,
          unlockedAt: i < 5 ? `2024-07-${String(i + 16).padStart(2, '0')}` : null
        }))
      }
    ],
    2: [
      {
        id: 103,
        courseTitle: 'Python 数据分析',
        totalLessons: 25,
        purchaseDate: '2024-06-20',
        unlockedLessons: 18,
        lessons: Array.from({length: 25}, (_, i) => ({
          id: i + 1,
          title: `第${i + 1}课：Python 数据分析 ${i < 18 ? '已完成' : '未解锁'}`,
          isUnlocked: i < 18,
          unlockedAt: i < 18 ? `2024-06-${String(i + 21).padStart(2, '0')}` : null
        }))
      }
    ],
    3: [
      {
        id: 104,
        courseTitle: 'UI/UX 设计实战',
        totalLessons: 12,
        purchaseDate: '2024-08-01',
        unlockedLessons: 3,
        lessons: Array.from({length: 12}, (_, i) => ({
          id: i + 1,
          title: `第${i + 1}课：UI/UX 设计 ${i < 3 ? '已完成' : '待解锁'}`,
          isUnlocked: i < 3,
          unlockedAt: i < 3 ? `2024-08-${String(i + 2).padStart(2, '0')}` : null
        }))
      }
    ]
  };

  // 初始化加载用户列表
  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm]);

  // 加载用户列表（分页 + 搜索）
  const loadUsers = () => {
    setLoading(true);
    setTimeout(() => {
      let filteredUsers = mockUsers;
      
      // 如果有搜索条件，进行筛选
      if (searchTerm.trim()) {
        filteredUsers = mockUsers.filter(user => 
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.phone.includes(searchTerm)
        );
      }
      
      // 分页处理
      const total = Math.ceil(filteredUsers.length / usersPerPage);
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      
      setAllUsers(filteredUsers);
      setUsers(paginatedUsers);
      setTotalPages(total);
      setLoading(false);
    }, 300);
  };

  // 搜索用户
  const handleSearch = () => {
    setCurrentPage(1); // 重置到第一页
    loadUsers();
  };

  // 清除搜索
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // 分页操作
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 选择用户
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setCourses(mockCourses[user.id] || []);
  };

  // 解锁单个课程
  const handleUnlockLesson = (courseId, lessonId) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              unlockedLessons: course.unlockedLessons + 1,
              lessons: course.lessons.map(lesson =>
                lesson.id === lessonId
                  ? { ...lesson, isUnlocked: true, unlockedAt: new Date().toISOString().split('T')[0] }
                  : lesson
              )
            }
          : course
      )
    );
    setMessage(`已成功解锁课程！`);
    setTimeout(() => setMessage(''), 3000);
  };

  // 批量解锁课程
  const handleBatchUnlock = (courseId, count) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              unlockedLessons: Math.min(course.unlockedLessons + count, course.totalLessons),
              lessons: course.lessons.map((lesson, index) =>
                index < course.unlockedLessons + count
                  ? { ...lesson, isUnlocked: true, unlockedAt: lesson.unlockedAt || new Date().toISOString().split('T')[0] }
                  : lesson
              )
            }
          : course
      )
    );
    setMessage(`已成功批量解锁 ${count} 课！`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* 头部 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">运营后台 - 手动解锁课程</h1>
          
          {/* 搜索区域 */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索用户（用户名、邮箱、手机号）"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '搜索中...' : '搜索'}
            </button>
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                清除
              </button>
            )}
            <button
              onClick={() => setShowCourseInfo(!showCourseInfo)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                showCourseInfo
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              {showCourseInfo ? '隐藏课程' : '显示课程'}
            </button>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {message}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 用户列表 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  用户列表 
                  {searchTerm ? (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (搜索结果: {allUsers.length} 个用户)
                    </span>
                  ) : (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (共 {mockUsers.length} 个用户)
                    </span>
                  )}
                </h2>
              </div>
              
              {loading ? (
                <div className="text-center text-gray-500 py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p>加载中...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>{searchTerm ? '未找到匹配的用户' : '暂无用户数据'}</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            用户信息
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            课程数量
                          </th>
                          {showCourseInfo && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              拥有课程
                            </th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            最后登录
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                          <tr 
                            key={user.id}
                            className={`hover:bg-gray-50 transition-colors ${
                              selectedUser?.id === user.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-sm text-gray-500">{user.phone}</div>
                                <div className="text-xs text-gray-400 mt-1">注册: {user.registeredAt}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                                <span className="text-sm font-medium text-gray-900">{user.courseCount}</span>
                              </div>
                            </td>
                            {showCourseInfo && (
                              <td className="px-6 py-4">
                                <div className="max-w-xs">
                                  {user.courses.map((course, index) => (
                                    <div key={index} className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1 mb-1 inline-block mr-1">
                                      {course}
                                    </div>
                                  ))}
                                </div>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600">{user.lastLoginAt}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleSelectUser(user)}
                                className={`inline-flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                                  selectedUser?.id === user.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                              >
                                <Settings className="w-4 h-4 mr-1" />
                                {selectedUser?.id === user.id ? '已选中' : '管理'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* 分页器 */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        显示第 {(currentPage - 1) * usersPerPage + 1} - {Math.min(currentPage * usersPerPage, allUsers.length)} 条，共 {allUsers.length} 条
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          上一页
                        </button>
                        
                        {[...Array(totalPages)].map((_, i) => {
                          const page = i + 1;
                          // 只显示当前页附近的页码
                          if (totalPages <= 7 || page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 text-sm border rounded ${
                                  currentPage === page
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 3 || page === currentPage + 3) {
                            return <span key={page} className="px-2 text-gray-400">...</span>;
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          下一页
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 课程详情 */}
          <div className="lg:col-span-2">
            {selectedUser ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {selectedUser.username} 的课程管理
                    </h2>
                  </div>
                </div>

                {courses.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">该用户暂无购买课程</p>
                  </div>
                ) : (
                  courses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.courseTitle}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              总课程: {course.totalLessons}
                            </span>
                            <span className="flex items-center gap-1">
                              <Unlock className="w-4 h-4 text-green-600" />
                              已解锁: {course.unlockedLessons}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              购买时间: {course.purchaseDate}
                            </span>
                          </div>
                        </div>
                        
                        {/* 批量操作 */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleBatchUnlock(course.id, 1)}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            disabled={course.unlockedLessons >= course.totalLessons}
                          >
                            解锁1课
                          </button>
                          <button
                            onClick={() => handleBatchUnlock(course.id, 5)}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                            disabled={course.unlockedLessons >= course.totalLessons}
                          >
                            解锁5课
                          </button>
                          <button
                            onClick={() => handleBatchUnlock(course.id, course.totalLessons)}
                            className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                            disabled={course.unlockedLessons >= course.totalLessons}
                          >
                            全部解锁
                          </button>
                        </div>
                      </div>

                      {/* 进度条 */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>解锁进度</span>
                          <span>{Math.round(course.unlockedLessons / course.totalLessons * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(course.unlockedLessons / course.totalLessons) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* 课程列表 */}
                      <div className="space-y-2">
                        {course.lessons.map(lesson => (
                          <div
                            key={lesson.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              lesson.isUnlocked
                                ? 'border-green-200 bg-green-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {lesson.isUnlocked ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Lock className="w-5 h-5 text-gray-400" />
                              )}
                              <span className={`font-medium ${
                                lesson.isUnlocked ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {lesson.title}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {lesson.isUnlocked ? (
                                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                  {lesson.unlockedAt} 解锁
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleUnlockLesson(course.id, lesson.id)}
                                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                                >
                                  <Unlock className="w-3 h-3" />
                                  解锁
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">请选择左侧用户来管理课程</p>
                <p className="text-sm text-gray-400">
                  点击用户卡片右侧的"管理课程"按钮开始操作
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}