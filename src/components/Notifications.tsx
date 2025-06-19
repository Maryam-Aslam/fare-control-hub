
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Send, 
  Users, 
  Car,
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'New Ride Booking',
      message: 'John Doe booked a Sedan from Airport to Downtown',
      timestamp: '2024-12-19 14:30',
      read: false,
      customerName: 'John Doe',
      bookingId: 'BOOK001'
    },
    {
      id: 2,
      type: 'completion',
      title: 'Ride Completed',
      message: 'Jane Smith completed her Mid-Size SUV ride',
      timestamp: '2024-12-19 13:45',
      read: true,
      customerName: 'Jane Smith',
      bookingId: 'BOOK002'
    },
    {
      id: 3,
      type: 'cancellation',
      title: 'Ride Cancelled',
      message: 'Mike Johnson cancelled his Luxury SUV booking',
      timestamp: '2024-12-19 12:15',
      read: false,
      customerName: 'Mike Johnson',
      bookingId: 'BOOK003'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Processed',
      message: 'Payment of $89.50 received from Sarah Wilson',
      timestamp: '2024-12-19 11:30',
      read: true,
      customerName: 'Sarah Wilson',
      bookingId: 'BOOK004'
    }
  ]);

  const [newMessage, setNewMessage] = useState({
    recipient: 'all',
    title: '',
    message: ''
  });

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    const notification = {
      id: notifications.length + 1,
      type: 'admin',
      title: newMessage.title,
      message: newMessage.message,
      timestamp: new Date().toLocaleString(),
      read: false,
      customerName: 'Admin',
      bookingId: 'ADMIN' + (notifications.length + 1)
    };

    setNotifications([notification, ...notifications]);
    setNewMessage({ recipient: 'all', title: '', message: '' });
    
    toast({
      title: "Notification Sent",
      description: `Message sent to ${newMessage.recipient}`,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Car className="w-4 h-4 text-blue-500" />;
      case 'completion':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancellation':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'payment':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      booking: { label: 'Booking', className: 'bg-blue-100 text-blue-800' },
      completion: { label: 'Completed', className: 'bg-green-100 text-green-800' },
      cancellation: { label: 'Cancelled', className: 'bg-red-100 text-red-800' },
      payment: { label: 'Payment', className: 'bg-purple-100 text-purple-800' },
      admin: { label: 'Admin', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = typeConfig[type] || typeConfig.admin;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notif.read) ||
                      (activeTab === 'read' && notif.read);
    
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    today: notifications.filter(n => n.timestamp.includes('2024-12-19')).length
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Badge variant="outline">{stats.total} Total</Badge>
          <Badge variant="outline" className="text-red-600">{stats.unread} Unread</Badge>
          <Badge variant="outline">{stats.today} Today</Badge>
        </div>
      </div>

      {/* Send New Notification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Send className="w-5 h-5 mr-2 text-red-600" />
            Send Notification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipient">Recipient</Label>
                <select
                  id="recipient"
                  value={newMessage.recipient}
                  onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="customers">Customers Only</option>
                  <option value="drivers">Drivers Only</option>
                </select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newMessage.title}
                  onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                  placeholder="Notification title"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                placeholder="Your notification message..."
                required
                className="min-h-[80px]"
              />
            </div>
            <Button type="submit" className="admin-gradient w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'unread', 'read'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? 'admin-gradient' : ''}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Recent Notifications ({filteredNotifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{notification.title}</h4>
                          {getTypeBadge(notification.type)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-gray-500">
                          <span>{notification.timestamp}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Customer: {notification.customerName}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Booking: {notification.bookingId}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Mark Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
