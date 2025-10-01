// Red Cross Philippines Admin Dashboard JavaScript

// Sample data for demonstration
const sampleUsers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        role: "volunteer",
        status: "active",
        lastActive: "2024-12-15",
        avatar: "JD"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@email.com",
        role: "staff",
        status: "active",
        lastActive: "2024-12-14",
        avatar: "JS"
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@email.com",
        role: "member",
        status: "pending",
        lastActive: "2024-12-13",
        avatar: "MJ"
    },
    {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        role: "volunteer",
        status: "inactive",
        lastActive: "2024-12-10",
        avatar: "SW"
    },
    {
        id: 5,
        name: "David Brown",
        email: "david.brown@email.com",
        role: "admin",
        status: "active",
        lastActive: "2024-12-15",
        avatar: "DB"
    }
];

const sampleEvents = [
    {
        id: 1,
        title: "Blood Drive - Makati",
        date: "2024-12-20",
        location: "Makati City Hall",
        description: "Monthly blood donation drive in Makati",
        status: "upcoming",
        volunteers: 15
    },
    {
        id: 2,
        title: "First Aid Training",
        date: "2024-12-18",
        location: "Red Cross Manila",
        description: "Basic first aid training for volunteers",
        status: "ongoing",
        volunteers: 25
    },
    {
        id: 3,
        title: "Disaster Relief - Typhoon Response",
        date: "2024-12-10",
        location: "Quezon City",
        description: "Emergency response for typhoon victims",
        status: "completed",
        volunteers: 50
    }
];

const sampleVolunteers = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        role: "Emergency Response",
        status: "active",
        tasks: ["First Aid", "Search & Rescue"],
        phone: "+63 912 345 6789"
    },
    {
        id: 2,
        name: "Maria Santos",
        email: "maria.santos@email.com",
        role: "Blood Services",
        status: "active",
        tasks: ["Blood Collection", "Donor Care"],
        phone: "+63 917 123 4567"
    },
    {
        id: 3,
        name: "Carlos Rodriguez",
        email: "carlos.rodriguez@email.com",
        role: "Training Coordinator",
        status: "pending",
        tasks: ["Training", "Education"],
        phone: "+63 918 987 6543"
    }
];

const sampleDonations = [
    {
        id: 1,
        donor: "Anonymous",
        amount: 5000,
        method: "GCash",
        date: "2024-12-15",
        status: "completed"
    },
    {
        id: 2,
        donor: "Maria Santos",
        amount: 2500,
        method: "Bank Transfer",
        date: "2024-12-14",
        status: "completed"
    },
    {
        id: 3,
        donor: "John Corporation",
        amount: 50000,
        method: "Check",
        date: "2024-12-13",
        status: "pending"
    }
];

// Global variables
let currentSection = 'dashboard';
let filteredUsers = [...sampleUsers];
let filteredEvents = [...sampleEvents];
let filteredVolunteers = [...sampleVolunteers];

// Section configuration
const SECTIONS = {
    'dashboard': 'dashboard',
    'users': 'users',
    'events': 'events',
    'volunteers': 'volunteers',
    'donations': 'donations',
    'settings': 'settings'
};

// Initialize the admin dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin dashboard initializing...');
    
    // Check authentication first
    if (!SessionManager.isLoggedIn()) {
        console.log('Not logged in, redirecting to login');
        window.location.href = 'login.html';
        return;
    }
    
    // Get current user and check if they're admin
    const currentUser = SessionManager.getCurrentUser();
    if (!currentUser.isAdmin) {
        console.log('Not admin user, redirecting to index');
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return;
    }
    
    console.log('Admin user authenticated:', currentUser.name);
    
    // Set up role-based access
    setupRoleBasedAccess(currentUser);
    
    initializeDashboard();
    setupEventListeners();
    loadDashboardData();
    loadUsersData();
    loadEventsData();
    loadVolunteersData();
    loadDonationsData();
    
    // Initialize with dashboard section
    showSection('dashboard');
    
    // Test all buttons after initialization
    setTimeout(() => {
        console.log('Running button tests...');
        testAllButtons();
    }, 1000);
    
    console.log('Admin dashboard initialization complete');
});

// Setup role-based access control
function setupRoleBasedAccess(user) {
    // Update profile menu with user info
    const profileName = document.querySelector('.text-sm.font-medium.text-gray-800');
    const profileRole = document.querySelector('.text-xs.text-gray-500');
    
    if (profileName) profileName.textContent = user.name;
    if (profileRole) profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    // Hide/disable features based on permissions
    if (!SessionManager.hasPermission('all')) {
        // Hide settings for non-super-admin users
        if (!SessionManager.hasPermission('settings')) {
            const settingsNav = document.querySelector('[data-section="settings"]');
            if (settingsNav) {
                settingsNav.parentElement.style.display = 'none';
            }
        }
        
        // Hide user management for staff and volunteers
        if (!SessionManager.hasPermission('users')) {
            const usersNav = document.querySelector('[data-section="users"]');
            if (usersNav) {
                usersNav.parentElement.style.display = 'none';
            }
        }
        
        // Hide donation tracking for volunteers
        if (!SessionManager.hasPermission('donations')) {
            const donationsNav = document.querySelector('[data-section="donations"]');
            if (donationsNav) {
                donationsNav.parentElement.style.display = 'none';
            }
        }
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Set initial active section
    showSection('dashboard');
    
    // Initialize profile menu with a small delay to ensure DOM is ready
    setTimeout(() => {
        setupProfileMenu();
    }, 100);
    
    // Initialize modals
    setupModals();
}

// Handle section navigation
function handleSectionNavigation() {
    console.log('Setting up section navigation...');
    
    // Start with dashboard section
    showSection('dashboard');
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        console.log('DOM should be ready now...');
        
        // Navigation - updated to work with button elements
        const navButtons = document.querySelectorAll('.nav-link');
        console.log('Found navigation buttons:', navButtons.length);
        
        if (navButtons.length === 0) {
            console.error('NO NAVIGATION BUTTONS FOUND!');
            console.log('Available elements with nav-link:', document.querySelectorAll('.nav-link'));
            return;
        }
        
        setupNavigationButtons(navButtons);
        setupOtherEventListeners();
    }, 100);
}

// Setup navigation buttons
function setupNavigationButtons(navButtons) {
    console.log('Setting up navigation buttons...');
    console.log('Found navigation buttons:', navButtons.length);
    
    navButtons.forEach((button, index) => {
        const section = button.getAttribute('data-section');
        console.log(`Setting up button ${index + 1}:`, section, button);
        
        // Remove any existing event listeners
        button.removeEventListener('click', handleNavigationClick);
        
        // Add new event listener
        button.addEventListener('click', handleNavigationClick);
        
        // Also add a direct onclick for backup
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Direct onclick triggered for:', section);
            showSection(section);
        };
    });
    
    console.log('Navigation buttons setup complete');
}

// Navigation click handler
function handleNavigationClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const section = this.getAttribute('data-section');
    console.log('Navigation clicked:', section, this);
    
    // Show the section
    showSection(section);
}

// Setup other event listeners
function setupOtherEventListeners() {
    console.log('Setting up other event listeners...');
    
    // Search and filter functionality
    setupSearchAndFilters();
    
    // Modal buttons
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => openModal('eventModal'));
    }
    
    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => openModal('userModal'));
    }
    
    const addVolunteerBtn = document.getElementById('addVolunteerBtn');
    if (addVolunteerBtn) {
        addVolunteerBtn.addEventListener('click', () => openModal('userModal')); // Using userModal for volunteers too
    }
    
    
    // Quick action buttons in dashboard
    const quickAddEvent = document.getElementById('quickAddEvent');
    if (quickAddEvent) {
        quickAddEvent.addEventListener('click', () => openModal('eventModal'));
    }
    
    const quickAddUser = document.getElementById('quickAddUser');
    if (quickAddUser) {
        quickAddUser.addEventListener('click', () => openModal('userModal'));
    }
    
    const quickExportData = document.getElementById('quickExportData');
    if (quickExportData) {
        quickExportData.addEventListener('click', () => {
            showNotification('Export functionality coming soon!', 'info');
        });
    }
    
    const quickViewReports = document.getElementById('quickViewReports');
    if (quickViewReports) {
        quickViewReports.addEventListener('click', () => {
            showNotification('Reports functionality coming soon!', 'info');
        });
    }
    
    
        // Form submissions
        const eventForm = document.getElementById('eventForm');
        if (eventForm) {
            eventForm.addEventListener('submit', handleEventSubmit);
        }

        // Dashboard form submissions
        const dashboardEventForm = document.getElementById('dashboardEventForm');
        if (dashboardEventForm) {
            dashboardEventForm.addEventListener('submit', handleDashboardEventSubmit);
        }

        const dashboardUserForm = document.getElementById('dashboardUserForm');
        if (dashboardUserForm) {
            dashboardUserForm.addEventListener('submit', handleDashboardUserSubmit);
        }

        // Dashboard form cancel buttons
        const cancelDashboardEvent = document.getElementById('cancelDashboardEvent');
        if (cancelDashboardEvent) {
            cancelDashboardEvent.addEventListener('click', () => {
                hideEventForm();
            });
        }

        const cancelEventManagement = document.getElementById('cancelEventManagement');
        if (cancelEventManagement) {
            cancelEventManagement.addEventListener('click', () => {
                hideEventManagementForm();
            });
        }

        const cancelDashboardUser = document.getElementById('cancelDashboardUser');
        if (cancelDashboardUser) {
            cancelDashboardUser.addEventListener('click', () => {
                hideDashboardUserForm();
            });
        }

        const cancelUserManagement = document.getElementById('cancelUserManagement');
        if (cancelUserManagement) {
            cancelUserManagement.addEventListener('click', () => {
                hideUserManagementForm();
            });
        }

        const cancelVolunteerStaff = document.getElementById('cancelVolunteerStaff');
        if (cancelVolunteerStaff) {
            cancelVolunteerStaff.addEventListener('click', () => {
                hideVolunteerStaffForm();
            });
        }

        const cancelDonation = document.getElementById('cancelDonation');
        if (cancelDonation) {
            cancelDonation.addEventListener('click', () => {
                hideDonationForm();
            });
        }

        // Volunteer modal buttons
        const cancelVolunteerBtn = document.getElementById('cancelVolunteerBtn');
        if (cancelVolunteerBtn) {
            cancelVolunteerBtn.addEventListener('click', () => closeModal('volunteerModal'));
        }

        // Volunteer form submission
        const volunteerForm = document.getElementById('volunteerForm');
        if (volunteerForm) {
            volunteerForm.addEventListener('submit', handleVolunteerSubmit);
        }
    
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', handleUserSubmit);
    }
    
    // Profile menu logout
    const logoutLink = document.querySelector('a[href="#"]:last-child');
    if (logoutLink && logoutLink.textContent.includes('Logout')) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logging out...', 'info');
                setTimeout(() => {
                    SessionManager.logout();
                    window.location.href = 'login.html';
                }, 1000);
            }
        });
    }
    
    // Notification bell button
    const notificationBtn = document.querySelector('button.relative.p-2');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            showNotification('No new notifications', 'info');
        });
    }
}

// Show specific section
function showSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // First, let's check what sections exist
    const allSections = document.querySelectorAll('.admin-section');
    console.log('All sections found:', allSections.length);
    allSections.forEach(section => {
        console.log('Section ID:', section.id);
    });
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        console.log('Section shown:', sectionName);
    } else {
        console.error('Section not found:', sectionName);
        console.log('Available sections:', document.querySelectorAll('.admin-section'));
        return;
    }
    
    // Update navigation - reset all items to default state
    document.querySelectorAll('.nav-link').forEach(item => {
        // Remove active classes
        item.classList.remove('active', 'bg-red-cross-blue', 'text-white');
        // Add default classes
        item.classList.add('bg-red-cross-light-blue', 'text-gray-800');
    });
    
    // Add active state to current section
    const activeItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeItem) {
        // Remove default classes
        activeItem.classList.remove('bg-red-cross-light-blue', 'text-gray-800');
        // Add active classes
        activeItem.classList.add('active', 'bg-red-cross-blue', 'text-white');
        console.log('Navigation updated for:', sectionName);
    } else {
        console.error('Navigation item not found for:', sectionName);
    }
    
    currentSection = sectionName;
}

// Setup profile menu
function setupProfileMenu() {
    console.log('Setting up profile menu...');
    
    // Use a more direct approach with inline onclick
    const profileMenuBtn = document.getElementById('profileMenuBtn');
    const profileMenu = document.getElementById('profileMenu');
    
    if (!profileMenuBtn || !profileMenu) {
        console.error('Profile menu elements not found!');
        return;
    }
    
    // Add onclick directly to the button
    profileMenuBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Profile menu clicked');
        profileMenu.classList.toggle('hidden');
    };
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileMenuBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('hidden');
        }
    });
    
    console.log('Profile menu setup complete');
}

// Toggle profile menu function
function toggleProfileMenu() {
    console.log('Toggling profile menu...');
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu) {
        profileMenu.classList.toggle('hidden');
        console.log('Profile menu toggled');
        
        // Add click outside handler
        if (!profileMenu.classList.contains('hidden')) {
            setTimeout(() => {
                document.addEventListener('click', function closeProfileMenu(e) {
                    if (!e.target.closest('#profileMenuBtn') && !e.target.closest('#profileMenu')) {
                        profileMenu.classList.add('hidden');
                        document.removeEventListener('click', closeProfileMenu);
                    }
                });
            }, 100);
        }
    } else {
        console.error('Profile menu not found!');
    }
}

// Logout function
function logout() {
    console.log('Logging out...');
    // Clear any stored session data
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('user');
    
    // Redirect to main site
    window.location.href = 'index.html';
}

// Setup modals
function setupModals() {
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    // Reset form
    document.querySelector(`#${modalId} form`).reset();
}

// Setup search and filters
function setupSearchAndFilters() {
    // User search and filters
    const userSearch = document.getElementById('userSearch');
    const userRoleFilter = document.getElementById('userRoleFilter');
    const userStatusFilter = document.getElementById('userStatusFilter');
    
    [userSearch, userRoleFilter, userStatusFilter].forEach(element => {
        element.addEventListener('input', filterUsers);
    });
    
    // Event search and filters
    const eventSearch = document.getElementById('eventSearch');
    const eventStatusFilter = document.getElementById('eventStatusFilter');
    
    [eventSearch, eventStatusFilter].forEach(element => {
        element.addEventListener('input', filterEvents);
    });
    
    // Volunteer search and filters
    const volunteerSearch = document.getElementById('volunteerSearch');
    const volunteerStatusFilter = document.getElementById('volunteerStatusFilter');
    
    [volunteerSearch, volunteerStatusFilter].forEach(element => {
        element.addEventListener('input', filterVolunteers);
    });
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('userRoleFilter').value;
    const statusFilter = document.getElementById('userStatusFilter').value;
    
    filteredUsers = sampleUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                            user.email.toLowerCase().includes(searchTerm);
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;
        
        return matchesSearch && matchesRole && matchesStatus;
    });
    
    loadUsersData();
}

// Filter events
function filterEvents() {
    const searchTerm = document.getElementById('eventSearch').value.toLowerCase();
    const statusFilter = document.getElementById('eventStatusFilter').value;
    
    filteredEvents = sampleEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                            event.description.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || event.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    loadEventsData();
}

// Filter volunteers
function filterVolunteers() {
    const searchTerm = document.getElementById('volunteerSearch').value.toLowerCase();
    const statusFilter = document.getElementById('volunteerStatusFilter').value;
    
    filteredVolunteers = sampleVolunteers.filter(volunteer => {
        const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm) || 
                            volunteer.email.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || volunteer.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });
    
    loadVolunteersData();
}

// Load dashboard data
function loadDashboardData() {
    // Dashboard data is already loaded in HTML
    // This function can be used to update real-time data
    updateDashboardStats();
}

// Update dashboard stats
function updateDashboardStats() {
    // This would typically fetch real data from an API
    // For now, we'll use the sample data
    const totalUsers = sampleUsers.length;
    const activeVolunteers = sampleVolunteers.filter(v => v.status === 'active').length;
    const upcomingEvents = sampleEvents.filter(e => e.status === 'upcoming').length;
    const totalDonations = sampleDonations.reduce((sum, d) => sum + d.amount, 0);
    
    // Update stats in the UI (if needed)
    console.log('Dashboard stats updated:', {
        totalUsers,
        activeVolunteers,
        upcomingEvents,
        totalDonations
    });
}

// Load users data
function loadUsersData() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = createUserRow(user);
        tbody.appendChild(row);
    });
}

// Create user row
function createUserRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-red-cross-blue rounded-full flex items-center justify-center text-white font-semibold">
                    ${user.avatar}
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${user.name}</div>
                    <div class="text-sm text-gray-500">${user.email}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}">
                ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${user.lastActive}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
                <button onclick="editUser(${user.id})" class="text-red-cross-blue hover:text-red-cross-secondary-blue">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="toggleUserStatus(${user.id})" class="text-yellow-600 hover:text-yellow-700">
                    <i class="fas fa-toggle-${user.status === 'active' ? 'on' : 'off'}"></i>
                </button>
                <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    return row;
}

// Load events data
function loadEventsData() {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg p-6';
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-800">${event.title}</h3>
            <span class="px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(event.status)}">
                ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
        </div>
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-calendar mr-2"></i>
                ${new Date(event.date).toLocaleDateString()}
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-map-marker-alt mr-2"></i>
                ${event.location}
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-users mr-2"></i>
                ${event.volunteers} volunteers
            </div>
        </div>
        <p class="text-sm text-gray-600 mb-4">${event.description}</p>
        <div class="flex space-x-2">
            <button onclick="editEvent(${event.id})" class="flex-1 bg-red-cross-blue text-white px-3 py-2 rounded text-sm hover:bg-red-cross-secondary-blue transition-colors">
                <i class="fas fa-edit mr-1"></i>Edit
            </button>
            <button onclick="deleteEvent(${event.id})" class="px-3 py-2 border border-red-600 text-red-600 rounded text-sm hover:bg-red-600 hover:text-white transition-colors">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return card;
}

// Load volunteers data
function loadVolunteersData() {
    const tbody = document.getElementById('volunteersTableBody');
    tbody.innerHTML = '';
    
    filteredVolunteers.forEach(volunteer => {
        const row = createVolunteerRow(volunteer);
        tbody.appendChild(row);
    });
}

// Create volunteer row
function createVolunteerRow(volunteer) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    ${volunteer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${volunteer.name}</div>
                    <div class="text-sm text-gray-500">${volunteer.email}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${volunteer.role}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(volunteer.status)}">
                ${volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${volunteer.tasks.join(', ')}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div class="flex space-x-2">
                <button onclick="editVolunteer(${volunteer.id})" class="text-red-cross-blue hover:text-red-cross-secondary-blue">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="toggleVolunteerStatus(${volunteer.id})" class="text-yellow-600 hover:text-yellow-700">
                    <i class="fas fa-toggle-${volunteer.status === 'active' ? 'on' : 'off'}"></i>
                </button>
                <button onclick="deleteVolunteer(${volunteer.id})" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    return row;
}

// Load donations data
function loadDonationsData() {
    const tbody = document.getElementById('donationsTableBody');
    tbody.innerHTML = '';
    
    sampleDonations.forEach(donation => {
        const row = createDonationRow(donation);
        tbody.appendChild(row);
    });
}

// Create donation row
function createDonationRow(donation) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            ${donation.donor}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ₱${donation.amount.toLocaleString()}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${donation.method}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${new Date(donation.date).toLocaleDateString()}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(donation.status)}">
                ${donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
            </span>
        </td>
    `;
    return row;
}

// Utility functions
function getRoleBadgeClass(role) {
    const classes = {
        'admin': 'bg-red-100 text-red-800',
        'staff': 'bg-blue-100 text-blue-800',
        'volunteer': 'bg-green-100 text-green-800',
        'member': 'bg-gray-100 text-gray-800'
    };
    return classes[role] || 'bg-gray-100 text-gray-800';
}

function getStatusBadgeClass(status) {
    const classes = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-red-100 text-red-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-blue-100 text-blue-800',
        'cancelled': 'bg-gray-100 text-gray-800',
        'upcoming': 'bg-blue-100 text-blue-800',
        'ongoing': 'bg-yellow-100 text-yellow-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
}

// Event handlers
function handleEventSubmit(e) {
    e.preventDefault();
    
    const eventData = {
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value,
        status: document.getElementById('eventStatus').value
    };
    
    // Add new event to sample data
    const newEvent = {
        id: sampleEvents.length + 1,
        ...eventData,
        volunteers: 0
    };
    
    sampleEvents.unshift(newEvent);
    filteredEvents = [...sampleEvents];
    loadEventsData();
    closeModal('eventModal');
    
    // Show success message
    showNotification('Event created successfully!', 'success');
}

function handleUserSubmit(e) {
    e.preventDefault();
    
    const userData = {
        firstName: document.getElementById('userFirstName').value,
        lastName: document.getElementById('userLastName').value,
        email: document.getElementById('userEmail').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };
    
    // Add new user to sample data
    const newUser = {
        id: sampleUsers.length + 1,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        lastActive: new Date().toISOString().split('T')[0],
        avatar: `${userData.firstName[0]}${userData.lastName[0]}`
    };
    
    sampleUsers.unshift(newUser);
    filteredUsers = [...sampleUsers];
    loadUsersData();
    closeModal('userModal');
    
    // Show success message
    showNotification('User created successfully!', 'success');
}

// User actions
function editUser(userId) {
    console.log('Editing user:', userId);
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        // Pre-fill form with user data
        const firstNameField = document.getElementById('userFirstName');
        const lastNameField = document.getElementById('userLastName');
        const emailField = document.getElementById('userEmail');
        const roleField = document.getElementById('userRole');
        const statusField = document.getElementById('userStatus');
        
        if (firstNameField) firstNameField.value = user.name.split(' ')[0];
        if (lastNameField) lastNameField.value = user.name.split(' ')[1];
        if (emailField) emailField.value = user.email;
        if (roleField) roleField.value = user.role;
        if (statusField) statusField.value = user.status;
        
        openModal('userModal');
        showNotification(`Editing user: ${user.name}`, 'info');
    } else {
        showNotification('User not found', 'error');
    }
}

function toggleUserStatus(userId) {
    console.log('Toggling user status:', userId);
    const user = sampleUsers.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        loadUsersData();
        showNotification(`User ${user.status}`, 'info');
    } else {
        showNotification('User not found', 'error');
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = sampleUsers.findIndex(u => u.id === userId);
        if (index > -1) {
            sampleUsers.splice(index, 1);
            filteredUsers = [...sampleUsers];
            loadUsersData();
            showNotification('User deleted successfully!', 'success');
        }
    }
}

// Event actions
function editEvent(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (event) {
        // Pre-fill form with event data
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.date;
        document.getElementById('eventLocation').value = event.location;
        document.getElementById('eventDescription').value = event.description;
        document.getElementById('eventStatus').value = event.status;
        
        openModal('eventModal');
    }
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        const index = sampleEvents.findIndex(e => e.id === eventId);
        if (index > -1) {
            sampleEvents.splice(index, 1);
            filteredEvents = [...sampleEvents];
            loadEventsData();
            showNotification('Event deleted successfully!', 'success');
        }
    }
}

// Volunteer actions
function editVolunteer(volunteerId) {
    const volunteer = sampleVolunteers.find(v => v.id === volunteerId);
    if (volunteer) {
        showNotification('Edit volunteer functionality coming soon!', 'info');
    }
}

function toggleVolunteerStatus(volunteerId) {
    const volunteer = sampleVolunteers.find(v => v.id === volunteerId);
    if (volunteer) {
        volunteer.status = volunteer.status === 'active' ? 'inactive' : 'active';
        loadVolunteersData();
        showNotification(`Volunteer ${volunteer.status}`, 'info');
    }
}

function deleteVolunteer(volunteerId) {
    if (confirm('Are you sure you want to delete this volunteer?')) {
        const index = sampleVolunteers.findIndex(v => v.id === volunteerId);
        if (index > -1) {
            sampleVolunteers.splice(index, 1);
            filteredVolunteers = [...sampleVolunteers];
            loadVolunteersData();
            showNotification('Volunteer deleted successfully!', 'success');
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
        'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    // Mobile menu functionality can be added here if needed
    console.log('Mobile menu toggle');
}

// Test all button functionality
function testAllButtons() {
    console.log('Testing all button functionality...');
    
    // Test navigation buttons
    const navButtons = document.querySelectorAll('.nav-link');
    console.log('Navigation buttons found:', navButtons.length);
    navButtons.forEach((button, index) => {
        console.log(`Button ${index + 1}:`, button.getAttribute('data-section'), button.tagName);
    });
    
    // Test sections
    const sections = document.querySelectorAll('.admin-section');
    console.log('Sections found:', sections.length);
    sections.forEach((section, index) => {
        console.log(`Section ${index + 1}:`, section.id);
    });
    
    // Test sections
    console.log('Available sections:', Object.keys(SECTIONS));
    
    // Test modal buttons
    const modalButtons = ['addEventBtn', 'addUserBtn', 'addVolunteerBtn', 'quickAddEvent', 'quickAddUser', 'quickExportData', 'quickViewReports'];
    modalButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            console.log('Button found:', btnId);
        } else {
            console.warn('Button not found:', btnId);
        }
    });
    
    // Test form buttons
    const formButtons = ['cancelEventBtn', 'cancelUserBtn'];
    formButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            console.log('Form button found:', btnId);
        } else {
            console.warn('Form button not found:', btnId);
        }
    });
    
    console.log('Button test complete');
}

// Test navigation function
function testNavigation() {
    console.log('Testing navigation...');
    const sections = ['dashboard', 'users', 'events', 'volunteers', 'donations', 'settings'];
    sections.forEach(section => {
        console.log(`Testing section: ${section}`);
        showSection(section);
        setTimeout(() => {
            console.log(`Current section after ${section}:`, currentSection);
        }, 100);
    });
}

// Manual button test - call this from console
function testButtonClick() {
    console.log('Testing button click manually...');
    const buttons = document.querySelectorAll('.nav-link');
    console.log('Found buttons:', buttons.length);
    
    if (buttons.length > 0) {
        console.log('Clicking first button...');
        buttons[0].click();
    } else {
        console.error('No buttons found!');
    }
}

// Test section navigation
function testSectionNavigation() {
    console.log('Testing section navigation...');
    const sections = Object.keys(SECTIONS);
    
    sections.forEach((section, index) => {
        setTimeout(() => {
            console.log(`Testing section ${index + 1}: ${section}`);
            showSection(section);
        }, index * 1000);
    });
}

// Force setup navigation - call this from console if buttons aren't working
function forceSetupNavigation() {
    console.log('Force setting up navigation...');
    const navButtons = document.querySelectorAll('[data-section]');
    console.log('Found buttons:', navButtons.length);
    
    navButtons.forEach((button, index) => {
        console.log(`Setting up button ${index + 1}:`, button.getAttribute('data-section'));
        
        // Remove any existing listeners
        button.removeEventListener('click', () => {});
        
        // Add new listener
        button.addEventListener('click', function(e) {
            console.log('FORCE BUTTON CLICKED!', this.getAttribute('data-section'));
            alert('Force button clicked: ' + this.getAttribute('data-section'));
            showSection(this.getAttribute('data-section'));
        });
    });
    
    console.log('Force setup complete');
}

// Show notifications
function showNotifications() {
    // Check if notification popup already exists
    const existingPopup = document.getElementById('notificationPopup');
    if (existingPopup) {
        // If it exists, remove it (toggle off)
        existingPopup.remove();
        return;
    }
    
    const notifications = [
        { type: 'user', message: 'New user registration: Maria Santos', time: '2 minutes ago' },
        { type: 'event', message: 'Event created: Blood Drive 2024', time: '15 minutes ago' },
        { type: 'donation', message: 'New donation received: ₱5,000', time: '1 hour ago' }
    ];
    
    let notificationHtml = '<div class="bg-white rounded-lg shadow-lg p-4 max-w-sm">';
    notificationHtml += '<h3 class="font-semibold text-gray-800 mb-3">Notifications</h3>';
    
    notifications.forEach(notif => {
        const icon = notif.type === 'user' ? 'fas fa-user-plus text-green-600' : 
                    notif.type === 'event' ? 'fas fa-calendar-plus text-blue-600' : 
                    'fas fa-donate text-yellow-600';
        
        notificationHtml += `
            <div class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer" onclick="showSection('${notif.type === 'user' ? 'users' : notif.type === 'event' ? 'events' : 'donations'}')">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <i class="${icon} text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">${notif.message}</p>
                    <p class="text-xs text-gray-500">${notif.time}</p>
                </div>
            </div>
        `;
    });
    
    notificationHtml += '</div>';
    
    // Create and show notification popup
    const popup = document.createElement('div');
    popup.id = 'notificationPopup';
    popup.className = 'fixed top-16 right-4 z-50';
    popup.innerHTML = notificationHtml;
    document.body.appendChild(popup);
    
    // Close notification when clicking outside
    const closeNotificationHandler = function(e) {
        if (!popup.contains(e.target) && !e.target.closest('button[onclick="showNotifications()"]')) {
            popup.remove();
            document.removeEventListener('click', closeNotificationHandler);
        }
    };
    
    // Add a small delay to prevent immediate closure
    setTimeout(() => {
        document.addEventListener('click', closeNotificationHandler);
    }, 100);
}

// Export functions for global access
window.editUser = editUser;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.editVolunteer = editVolunteer;
window.toggleVolunteerStatus = toggleVolunteerStatus;
window.deleteVolunteer = deleteVolunteer;
window.toggleMobileMenu = toggleMobileMenu;
window.testAllButtons = testAllButtons;
window.testNavigation = testNavigation;
window.showSection = showSection;
window.testButtonClick = testButtonClick;
window.testSectionNavigation = testSectionNavigation;
window.forceSetupNavigation = forceSetupNavigation;
window.showNotifications = showNotifications;
window.toggleProfileMenu = toggleProfileMenu;
window.logout = logout;

// Event management functions
function viewEventDetails(eventId) {
    console.log('Viewing event details:', eventId);
    showNotification(`Opening event details for event ${eventId}`, 'info');
    // In a real application, this would open a detailed view or modal
}

// Export the new function
window.viewEventDetails = viewEventDetails;

// Donation management functions
function viewDonationDetails(donationId) {
    console.log('Viewing donation details:', donationId);
    showNotification(`Opening donation details for donation ${donationId}`, 'info');
}

function exportDonation(donationId) {
    console.log('Exporting donation:', donationId);
    showNotification(`Exporting donation ${donationId} to PDF`, 'success');
}

// Export the new functions
window.viewDonationDetails = viewDonationDetails;
window.exportDonation = exportDonation;

// Test navigation function
function testNavigation() {
    console.log('Testing navigation...');
    const sections = ['dashboard', 'users', 'events', 'volunteers', 'donations', 'settings'];
    
    sections.forEach((section, index) => {
        setTimeout(() => {
            console.log(`Testing section ${index + 1}: ${section}`);
            showSection(section);
        }, index * 1000);
    });
}

// Force navigation setup
function forceNavigationSetup() {
    console.log('Force setting up navigation...');
    
    // Setup navigation buttons
    const navButtons = document.querySelectorAll('.nav-link');
    console.log('Found navigation buttons:', navButtons.length);
    
    navButtons.forEach((button, index) => {
        const section = button.getAttribute('data-section');
        console.log(`Button ${index + 1}:`, section);
        
        // Ensure onclick is set
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button clicked:', section);
            showSection(section);
        };
    });
    
    console.log('Force navigation setup complete');
}

// Export test functions
window.testNavigation = testNavigation;
window.forceNavigationSetup = forceNavigationSetup;

// User Management Functions
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('userRoleFilter').value;
    const statusFilter = document.getElementById('userStatusFilter').value;
    
    console.log('Filtering users:', { searchTerm, roleFilter, statusFilter });
    
    const rows = document.querySelectorAll('#usersTableBody tr');
    
    rows.forEach(row => {
        const nameElement = row.querySelector('div.text-sm.font-medium');
        const emailElement = row.querySelector('td:nth-child(3)');
        const roleElement = row.querySelector('td:nth-child(4) span');
        const statusElement = row.querySelector('td:nth-child(5) span');
        
        const name = nameElement?.textContent.toLowerCase() || '';
        const email = emailElement?.textContent.toLowerCase() || '';
        const role = roleElement?.textContent.toLowerCase() || '';
        const status = statusElement?.textContent.toLowerCase() || '';
        
        const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
        const matchesRole = !roleFilter || role.includes(roleFilter);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesRole && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    showNotification(`Filtered users by: ${searchTerm || 'all'} ${roleFilter || 'roles'} ${statusFilter || 'statuses'}`, 'info');
}

// Event Management Functions
function filterEvents() {
    const searchTerm = document.getElementById('eventSearch').value.toLowerCase();
    const statusFilter = document.getElementById('eventStatusFilter').value;
    
    console.log('Filtering events:', { searchTerm, statusFilter });
    
    const cards = document.querySelectorAll('#eventsGrid > div');
    
    cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const status = card.querySelector('span')?.textContent.toLowerCase() || '';
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesStatus) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    showNotification(`Filtered events by: ${searchTerm || 'all'} ${statusFilter || 'statuses'}`, 'info');
}

// Volunteer Management Functions
function filterVolunteers() {
    const searchTerm = document.getElementById('volunteerSearch').value.toLowerCase();
    const statusFilter = document.getElementById('volunteerStatusFilter').value;
    
    console.log('Filtering volunteers:', { searchTerm, statusFilter });
    
    const rows = document.querySelectorAll('#volunteersTableBody tr');
    
    rows.forEach(row => {
        const nameElement = row.querySelector('div.text-sm.font-medium');
        const emailElement = row.querySelector('td:nth-child(2)');
        const statusElement = row.querySelector('td:nth-child(3) span');
        
        const name = nameElement?.textContent.toLowerCase() || '';
        const email = emailElement?.textContent.toLowerCase() || '';
        const status = statusElement?.textContent.toLowerCase() || '';
        
        const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    showNotification(`Filtered volunteers by: ${searchTerm || 'all'} ${statusFilter || 'statuses'}`, 'info');
}

// Donation Management Functions
function filterDonations() {
    const searchTerm = document.getElementById('donationSearch').value.toLowerCase();
    const statusFilter = document.getElementById('donationStatusFilter').value;
    
    console.log('Filtering donations:', { searchTerm, statusFilter });
    
    const rows = document.querySelectorAll('#donationsTableBody tr');
    
    rows.forEach(row => {
        const donor = row.querySelector('div.text-sm.font-medium')?.textContent.toLowerCase() || '';
        const email = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        const status = row.querySelector('span:contains("Completed"), span:contains("Pending"), span:contains("Failed")')?.textContent.toLowerCase() || '';
        
        const matchesSearch = donor.includes(searchTerm) || email.includes(searchTerm);
        const matchesStatus = !statusFilter || status.includes(statusFilter);
        
        if (matchesSearch && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    showNotification(`Filtered donations by: ${searchTerm || 'all'} ${statusFilter || 'statuses'}`, 'info');
}

// Settings Functions
function exportSystemData() {
    console.log('Exporting system data...');
    showNotification('Exporting system data... This may take a few minutes.', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification('System data exported successfully! Download will start shortly.', 'success');
    }, 2000);
}

function syncDatabase() {
    console.log('Syncing database...');
    showNotification('Syncing database... Please wait.', 'info');
    
    // Simulate sync process
    setTimeout(() => {
        showNotification('Database synced successfully!', 'success');
    }, 3000);
}

function toggleMaintenanceMode() {
    console.log('Toggling maintenance mode...');
    const isMaintenanceMode = confirm('Are you sure you want to toggle maintenance mode? This will affect all users.');
    
    if (isMaintenanceMode) {
        showNotification('Maintenance mode toggled successfully!', 'success');
    }
}

function restartSystem() {
    console.log('Restarting system...');
    const isRestart = confirm('Are you sure you want to restart the system? This will log out all users.');
    
    if (isRestart) {
        showNotification('System restart initiated... All users will be logged out.', 'warning');
    }
}

// Toggle Functions for Settings
function toggleSetting(settingId) {
    const toggle = document.getElementById(settingId);
    const isEnabled = toggle.checked;
    
    console.log(`Toggling ${settingId}:`, isEnabled);
    
    if (isEnabled) {
        showNotification(`${settingId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} enabled`, 'success');
    } else {
        showNotification(`${settingId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} disabled`, 'info');
    }
}


// Export all functions
window.filterUsers = filterUsers;
window.filterEvents = filterEvents;
window.filterVolunteers = filterVolunteers;
window.filterDonations = filterDonations;
window.exportSystemData = exportSystemData;
window.syncDatabase = syncDatabase;
window.toggleMaintenanceMode = toggleMaintenanceMode;
window.restartSystem = restartSystem;
window.toggleSetting = toggleSetting;
// Dashboard Form Functions
function showEventForm() {
    console.log('Showing dashboard event form...');
    
    // Hide other forms
    document.getElementById('userFormContainer').classList.add('hidden');
    document.getElementById('dashboardUserFormContainer').classList.add('hidden');
    document.getElementById('eventManagementFormContainer').classList.add('hidden');
    
    // Show dashboard event form
    const eventForm = document.getElementById('eventFormContainer');
    if (eventForm) {
        eventForm.classList.remove('hidden');
        eventForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Dashboard event creation form opened', 'info');
    } else {
        console.error('Dashboard event form container not found!');
    }
}

function showEventManagementForm() {
    console.log('Showing event management form...');
    
    // Show event management form
    const eventForm = document.getElementById('eventManagementFormContainer');
    if (eventForm) {
        eventForm.classList.remove('hidden');
        eventForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Event Management form opened', 'info');
    } else {
        console.error('Event Management form container not found!');
    }
}

function showDashboardUserForm() {
    console.log('Showing dashboard user form...');
    
    // Hide other forms
    document.getElementById('eventFormContainer').classList.add('hidden');
    document.getElementById('userFormContainer').classList.add('hidden');
    
    // Show dashboard user form
    const userForm = document.getElementById('dashboardUserFormContainer');
    if (userForm) {
        userForm.classList.remove('hidden');
        userForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Dashboard user creation form opened', 'info');
    } else {
        console.error('Dashboard user form container not found!');
    }
}

function showUserManagementForm() {
    console.log('Showing user management form...');
    
    // Show user management form
    const userForm = document.getElementById('userManagementFormContainer');
    if (userForm) {
        userForm.classList.remove('hidden');
        userForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('User Management form opened', 'info');
    } else {
        console.error('User Management form container not found!');
    }
}

function showVolunteerStaffForm() {
    console.log('Showing volunteer/staff form...');
    
    // Show volunteer/staff form
    const volunteerForm = document.getElementById('volunteerStaffFormContainer');
    if (volunteerForm) {
        volunteerForm.classList.remove('hidden');
        volunteerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Volunteer/Staff form opened', 'info');
    } else {
        console.error('Volunteer/Staff form container not found!');
    }
}

function showDonationForm() {
    console.log('Showing donation form...');
    
    // Show donation form
    const donationForm = document.getElementById('donationFormContainer');
    if (donationForm) {
        donationForm.classList.remove('hidden');
        donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showNotification('Donation form opened', 'info');
    } else {
        console.error('Donation form container not found!');
    }
}

function showUserForm() {
    console.log('Showing user form...');
    
    // Hide other forms
    document.getElementById('eventFormContainer').classList.add('hidden');
    
    // Show user form
    const userForm = document.getElementById('userFormContainer');
    userForm.classList.remove('hidden');
    
    // Scroll to form
    userForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    showNotification('User creation form opened', 'info');
}

function hideDashboardUserForm() {
    console.log('Hiding dashboard user form...');
    const userForm = document.getElementById('dashboardUserFormContainer');
    if (userForm) {
        userForm.classList.add('hidden');
        const form = document.getElementById('dashboardUserForm');
        if (form) {
            form.reset();
        }
    }
}

function hideUserManagementForm() {
    console.log('Hiding user management form...');
    const userForm = document.getElementById('userManagementFormContainer');
    if (userForm) {
        userForm.classList.add('hidden');
        const form = document.getElementById('userManagementForm');
        if (form) {
            form.reset();
        }
    }
}

function hideVolunteerStaffForm() {
    console.log('Hiding volunteer/staff form...');
    const volunteerForm = document.getElementById('volunteerStaffFormContainer');
    if (volunteerForm) {
        volunteerForm.classList.add('hidden');
        const form = document.getElementById('volunteerStaffForm');
        if (form) {
            form.reset();
        }
    }
}

function hideDonationForm() {
    console.log('Hiding donation form...');
    const donationForm = document.getElementById('donationFormContainer');
    if (donationForm) {
        donationForm.classList.add('hidden');
        const form = document.getElementById('donationForm');
        if (form) {
            form.reset();
        }
    }
}

function hideEventForm() {
    console.log('Hiding dashboard event form...');
    const eventForm = document.getElementById('eventFormContainer');
    if (eventForm) {
        eventForm.classList.add('hidden');
        const form = document.getElementById('dashboardEventForm');
        if (form) {
            form.reset();
        }
    }
}

function hideEventManagementForm() {
    console.log('Hiding event management form...');
    const eventForm = document.getElementById('eventManagementFormContainer');
    if (eventForm) {
        eventForm.classList.add('hidden');
        const form = document.getElementById('eventManagementForm');
        if (form) {
            form.reset();
        }
    }
}

function hideAllForms() {
    document.getElementById('eventFormContainer').classList.add('hidden');
    document.getElementById('userFormContainer').classList.add('hidden');
    document.getElementById('dashboardUserFormContainer').classList.add('hidden');
    document.getElementById('userManagementFormContainer').classList.add('hidden');
    document.getElementById('eventManagementFormContainer').classList.add('hidden');
    document.getElementById('volunteerStaffFormContainer').classList.add('hidden');
    document.getElementById('donationFormContainer').classList.add('hidden');
}

// Form submission handlers
function handleDashboardEventSubmit(e) {
    e.preventDefault();
    console.log('Dashboard event form submitted');
    
    const eventData = {
        name: document.getElementById('dashboardEventName').value,
        location: document.getElementById('dashboardEventLocation').value,
        description: document.getElementById('dashboardEventDescription').value
    };
    
    console.log('Event data:', eventData);
    showNotification('Event created successfully!', 'success');
    
    // Hide form
    hideAllForms();
    
    // Reset form
    document.getElementById('dashboardEventForm').reset();
}

function handleDashboardUserSubmit(e) {
    e.preventDefault();
    console.log('Dashboard user form submitted');
    
    const userData = {
        firstName: document.getElementById('dashboardUserFirstName').value,
        lastName: document.getElementById('dashboardUserLastName').value,
        email: document.getElementById('dashboardUserEmail').value,
        role: document.getElementById('dashboardUserRole').value,
        status: document.getElementById('dashboardUserStatus').value
    };
    
    console.log('User data:', userData);
    showNotification('User created successfully!', 'success');
    
    // Hide form
    hideAllForms();
    
    // Reset form
    document.getElementById('dashboardUserForm').reset();
}

// Volunteer form submission handler
function handleVolunteerSubmit(e) {
    e.preventDefault();
    console.log('Volunteer form submitted');
    
    const volunteerData = {
        fullName: document.getElementById('volunteerFullName').value,
        contact: document.getElementById('volunteerContact').value,
        email: document.getElementById('volunteerEmail').value,
        emergencyContact: document.getElementById('volunteerEmergencyContact').value,
        skills: document.getElementById('volunteerSkills').value,
        availability: document.getElementById('volunteerAvailability').value
    };
    
    console.log('Volunteer data:', volunteerData);
    showNotification('Volunteer/Staff added successfully!', 'success');
    
    // Close modal
    closeModal('volunteerModal');
    
    // Reset form
    document.getElementById('volunteerForm').reset();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.showEventForm = showEventForm;
window.showEventManagementForm = showEventManagementForm;
window.showUserForm = showUserForm;
window.showDashboardUserForm = showDashboardUserForm;
window.showUserManagementForm = showUserManagementForm;
window.showVolunteerStaffForm = showVolunteerStaffForm;
window.showDonationForm = showDonationForm;
window.hideEventForm = hideEventForm;
window.hideEventManagementForm = hideEventManagementForm;
window.hideDashboardUserForm = hideDashboardUserForm;
window.hideUserManagementForm = hideUserManagementForm;
window.hideVolunteerStaffForm = hideVolunteerStaffForm;
window.hideDonationForm = hideDonationForm;
window.hideAllForms = hideAllForms;
