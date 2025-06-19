
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Search, 
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Car
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      customerId: 'CUST001',
      customerName: 'John Doe',
      bookingId: 'BOOK001',
      amount: 89.50,
      type: 'payment',
      status: 'completed',
      date: '2024-12-19',
      time: '14:30',
      vehicleCategory: 'Sedans',
      pickupLocation: 'Downtown Airport',
      dropLocation: 'Hotel Central',
      paymentMethod: 'Credit Card',
      refundEligible: true,
      rideDate: '2024-12-19',
      rideTime: '14:30'
    },
    {
      id: 'TXN002',
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      bookingId: 'BOOK002',
      amount: 45.25,
      type: 'refund',
      status: 'pending',
      date: '2024-12-20',
      time: '10:00',
      vehicleCategory: 'Mid-Size SUVs',
      pickupLocation: 'Business District',
      dropLocation: 'Shopping Mall',
      paymentMethod: 'Debit Card',
      refundReason: 'Cancelled 12 hours before pickup',
      refundAmount: 22.63,
      refundEligible: true,
      rideDate: '2024-12-21',
      rideTime: '15:00'
    }
  ]);

  const handleRefundAction = (transactionId: string, action: 'approve' | 'reject') => {
    setTransactions(transactions.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: action === 'approve' ? 'completed' : 'rejected' }
        : transaction
    ));

    toast({
      title: `Refund ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `Transaction ${transactionId} has been ${action === 'approve' ? 'approved' : 'rejected'}`,
    });
  };

  const calculateRefundAmount = (amount: number, rideDate: string, rideTime: string) => {
    const rideDateTime = new Date(`${rideDate}T${rideTime}`);
    const now = new Date();
    const hoursDifference = (rideDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDifference > 24) {
      return amount * 0.5; // 50% refund
    } else {
      return 0; // No refund
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'payment':
        return <Badge className="bg-blue-100 text-blue-800">Payment</Badge>;
      case 'refund':
        return <Badge className="bg-purple-100 text-purple-800">Refund</Badge>;
      default:
        return <Badge variant="secondary">Other</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
        <Button className="admin-gradient">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer name, transaction ID, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card>
        <CardHeader>
          <CardTitle>Cancellation Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Refund Policy:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Cancellation before 24 hours: 50% refund</li>
              <li>• Cancellation within 24 hours of pickup time: No refund</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-semibold">{transaction.id}</div>
                        <div className="text-sm text-gray-600">{transaction.bookingId}</div>
                        <div className="text-xs text-gray-500">{transaction.vehicleCategory}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1 text-gray-500" />
                          <span className="font-semibold">{transaction.customerName}</span>
                        </div>
                        <div className="text-sm text-gray-600">{transaction.customerId}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center font-semibold">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {transaction.amount}
                        </div>
                        {transaction.type === 'refund' && transaction.refundAmount && (
                          <div className="text-sm text-purple-600">
                            Refund: ${transaction.refundAmount}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">{transaction.paymentMethod}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          <span>{transaction.date}</span>
                        </div>
                        <div className="text-sm text-gray-600">{transaction.time}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {transaction.type === 'refund' && transaction.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRefundAction(transaction.id, 'approve')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRefundAction(transaction.id, 'reject')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </>
                        )}
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

export default TransactionHistory;
