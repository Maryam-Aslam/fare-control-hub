
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Clock,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CityManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [cities, setCities] = useState([
    {
      id: 1,
      name: "New York",
      country: "USA",
      status: "active",
      baseFare: 2.50,
      perKmFare: 1.20,
      perMinuteFare: 0.30,
      totalDrivers: 245,
      totalRides: 12543
    },
    {
      id: 2,
      name: "Los Angeles",
      country: "USA", 
      status: "active",
      baseFare: 2.00,
      perKmFare: 1.10,
      perMinuteFare: 0.25,
      totalDrivers: 189,
      totalRides: 8934
    },
    {
      id: 3,
      name: "Chicago",
      country: "USA",
      status: "inactive",
      baseFare: 2.25,
      perKmFare: 1.15,
      perMinuteFare: 0.28,
      totalDrivers: 156,
      totalRides: 6721
    },
    {
      id: 4,
      name: "Miami",
      country: "USA",
      status: "active",
      baseFare: 2.75,
      perKmFare: 1.30,
      perMinuteFare: 0.35,
      totalDrivers: 98,
      totalRides: 4567
    }
  ]);

  const [newCity, setNewCity] = useState({
    name: '',
    country: '',
    baseFare: '',
    perKmFare: '',
    perMinuteFare: ''
  });

  const handleAddCity = (e: React.FormEvent) => {
    e.preventDefault();
    
    const city = {
      id: cities.length + 1,
      name: newCity.name,
      country: newCity.country,
      status: 'active',
      baseFare: parseFloat(newCity.baseFare),
      perKmFare: parseFloat(newCity.perKmFare),
      perMinuteFare: parseFloat(newCity.perMinuteFare),
      totalDrivers: 0,
      totalRides: 0
    };

    setCities([...cities, city]);
    setNewCity({ name: '', country: '', baseFare: '', perKmFare: '', perMinuteFare: '' });
    setShowAddForm(false);
    
    toast({
      title: "City Added",
      description: `${city.name} has been added successfully`,
    });
  };

  const toggleCityStatus = (id: number) => {
    setCities(cities.map(city => 
      city.id === id 
        ? { ...city, status: city.status === 'active' ? 'inactive' : 'active' }
        : city
    ));
  };

  const deleteCity = (id: number) => {
    setCities(cities.filter(city => city.id !== id));
    toast({
      title: "City Deleted",
      description: "City has been removed from the system",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">City Management</h1>
        <Button 
          className="admin-gradient"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add City
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add City Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New City</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCity} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="cityName">City Name</Label>
                <Input
                  id="cityName"
                  value={newCity.name}
                  onChange={(e) => setNewCity({...newCity, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={newCity.country}
                  onChange={(e) => setNewCity({...newCity, country: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="baseFare">Base Fare ($)</Label>
                <Input
                  id="baseFare"
                  type="number"
                  step="0.01"
                  value={newCity.baseFare}
                  onChange={(e) => setNewCity({...newCity, baseFare: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="perKmFare">Per KM Fare ($)</Label>
                <Input
                  id="perKmFare"
                  type="number"
                  step="0.01"
                  value={newCity.perKmFare}
                  onChange={(e) => setNewCity({...newCity, perKmFare: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="perMinuteFare">Per Minute Fare ($)</Label>
                <Input
                  id="perMinuteFare"
                  type="number"
                  step="0.01"
                  value={newCity.perMinuteFare}
                  onChange={(e) => setNewCity({...newCity, perMinuteFare: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-5 flex gap-2">
                <Button type="submit" className="admin-gradient">Add City</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <Card key={city.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 admin-gradient rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{city.name}</CardTitle>
                    <p className="text-sm text-gray-600">{city.country}</p>
                  </div>
                </div>
                {getStatusBadge(city.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fare Information */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Fare Structure</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${city.baseFare}</p>
                    <p className="text-gray-600">Base</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${city.perKmFare}</p>
                    <p className="text-gray-600">Per KM</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${city.perMinuteFare}</p>
                    <p className="text-gray-600">Per Min</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Statistics</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Drivers:</span>
                  <span className="font-semibold">{city.totalDrivers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Rides:</span>
                  <span className="font-semibold">{city.totalRides.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleCityStatus(city.id)}
                  className={city.status === 'active' ? 'text-yellow-600' : 'text-green-600'}
                >
                  {city.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteCity(city.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CityManagement;
