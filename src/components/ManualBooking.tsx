
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MapPin, 
  User, 
  Calendar,
  DollarSign,
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManualBooking = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "John Doe",
      customerPhone: "+1 234-567-8901",
      pickupLocation: "Downtown Airport",
      dropLocation: "Hotel Central",
      bookingDate: "2024-12-19",
      bookingTime: "14:30",
      vehicleCategory: "Sedans",
      fare: 89.50,
      status: "confirmed"
    },
    {
      id: 2,
      customerName: "Jane Smith",
      customerPhone: "+1 234-567-8902",
      pickupLocation: "Business District",
      dropLocation: "Shopping Mall",
      bookingDate: "2024-12-20",
      bookingTime: "10:00",
      vehicleCategory: "Mid-Size SUVs",
      fare: 124.99,
      status: "pending"
    }
  ]);

  const [newBooking, setNewBooking] = useState({
    customerName: '',
    customerPhone: '',
    pickupLocation: '',
    dropLocation: '',
    bookingDate: '',
    bookingTime: '',
    vehicleCategory: '',
    fare: ''
  });

  const vehicleCategories = ["Sedans", "Mid-Size SUVs", "Luxury SUVs"];

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking = {
      id: bookings.length + 1,
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone,
      pickupLocation: newBooking.pickupLocation,
      dropLocation: newBooking.dropLocation,
      bookingDate: newBooking.bookingDate,
      bookingTime: newBooking.bookingTime,
      vehicleCategory: newBooking.vehicleCategory,
      fare: parseFloat(newBooking.fare),
      status: "confirmed"
    };

    setBookings([...bookings, booking]);
    setNewBooking({
      customerName: '',
      customerPhone: '',
      pickupLocation: '',
      dropLocation: '',
      bookingDate: '',
      bookingTime: '',
      vehicleCategory: '',
      fare: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Booking Created",
      description: `Booking for ${booking.customerName} has been created successfully`,
    });
  };

  const handleEditBooking = (id: number) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      setNewBooking({
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        pickupLocation: booking.pickupLocation,
        dropLocation: booking.dropLocation,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        vehicleCategory: booking.vehicleCategory,
        fare: booking.fare.toString()
      });
      setEditingBooking(id);
      setShowAddForm(true);
    }
  };

  const handleUpdateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBooking) {
      setBookings(bookings.map(booking => 
        booking.id === editingBooking 
          ? {
              ...booking,
              customerName: newBooking.customerName,
              customerPhone: newBooking.customerPhone,
              pickupLocation: newBooking.pickupLocation,
              dropLocation: newBooking.dropLocation,
              bookingDate: newBooking.bookingDate,
              bookingTime: newBooking.bookingTime,
              vehicleCategory: newBooking.vehicleCategory,
              fare: parseFloat(newBooking.fare)
            }
          : booking
      ));
      
      setNewBooking({
        customerName: '',
        customerPhone: '',
        pickupLocation: '',
        dropLocation: '',
        bookingDate: '',
        bookingTime: '',
        vehicleCategory: '',
        fare: ''
      });
      setEditingBooking(null);
      setShowAddForm(false);
      
      toast({
        title: "Booking Updated",
        description: "Booking has been updated successfully",
      });
    }
  };

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    toast({
      title: "Booking Deleted",
      description: "Booking has been removed from the system",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerPhone.includes(searchTerm) ||
    booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manual Booking</h1>
        <Button 
          className="admin-gradient"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Booking
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search bookings by customer name, phone, or pickup location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingBooking ? 'Edit Booking' : 'Create New Booking'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingBooking ? handleUpdateBooking : handleAddBooking} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newBooking.customerName}
                    onChange={(e) => setNewBooking({...newBooking, customerName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Customer Phone</Label>
                  <Input
                    id="customerPhone"
                    value={newBooking.customerPhone}
                    onChange={(e) => setNewBooking({...newBooking, customerPhone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Input
                    id="pickupLocation"
                    value={newBooking.pickupLocation}
                    onChange={(e) => setNewBooking({...newBooking, pickupLocation: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dropLocation">Drop Location</Label>
                  <Input
                    id="dropLocation"
                    value={newBooking.dropLocation}
                    onChange={(e) => setNewBooking({...newBooking, dropLocation: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bookingDate">Booking Date</Label>
                  <Input
                    id="bookingDate"
                    type="date"
                    value={newBooking.bookingDate}
                    onChange={(e) => setNewBooking({...newBooking, bookingDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bookingTime">Booking Time</Label>
                  <Input
                    id="bookingTime"
                    type="time"
                    value={newBooking.bookingTime}
                    onChange={(e) => setNewBooking({...newBooking, bookingTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleCategory">Vehicle Category</Label>
                  <select
                    id="vehicleCategory"
                    value={newBooking.vehicleCategory}
                    onChange={(e) => setNewBooking({...newBooking, vehicleCategory: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {vehicleCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="fare">Fare ($)</Label>
                  <Input
                    id="fare"
                    type="number"
                    step="0.01"
                    value={newBooking.fare}
                    onChange={(e) => setNewBooking({...newBooking, fare: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="admin-gradient">
                  {editingBooking ? 'Update Booking' : 'Create Booking'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingBooking(null);
                    setNewBooking({
                      customerName: '',
                      customerPhone: '',
                      pickupLocation: '',
                      dropLocation: '',
                      bookingDate: '',
                      bookingTime: '',
                      vehicleCategory: '',
                      fare: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Journey</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Vehicle</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fare</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="font-semibold">{booking.customerName}</span>
                        </div>
                        <div className="text-sm text-gray-600">{booking.customerPhone}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-green-500" />
                          <span className="text-gray-900">{booking.pickupLocation}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1 text-red-500" />
                          <span className="text-gray-600">{booking.dropLocation}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          <span>{booking.bookingDate}</span>
                        </div>
                        <div className="text-sm text-gray-600">{booking.bookingTime}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm">{booking.vehicleCategory}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm font-semibold">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {booking.fare}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditBooking(booking.id)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManualBooking;
