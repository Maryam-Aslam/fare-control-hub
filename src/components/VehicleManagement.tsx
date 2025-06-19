
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VehicleManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const { toast } = useToast();

  const sedan = ['Cadillac CTS', 'BMW 5 & 7 series', 'MERCEDES BENZ 500'];
  const midsuv = ['CADIALLC XT6', 'BMW X5', 'MERCEDES G450', 'LINCOLN AVAITOR', 'LINCOLN NAUTILUS'];
  const luxsuv = ['CADIALLC ESCALADE', 'GMC YUKON', 'LINCOLN NAVIGATOR', 'CHEVY SUBURBAN'];

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Sedans",
      vehicles: sedan,
      baseFare: 69.95,
      perMile: 5.00,
      hourlyRate: 70.00,
      status: "active"
    },
    {
      id: 2,
      name: "Mid-Size SUVs",
      vehicles: midsuv,
      baseFare: 74.99,
      perMile: 5.00,
      hourlyRate: 80.00,
      status: "active"
    },
    {
      id: 3,
      name: "Luxury SUVs",
      vehicles: luxsuv,
      baseFare: 85.00,
      perMile: 5.00,
      hourlyRate: 100.00,
      status: "active"
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    baseFare: '',
    perMile: '',
    hourlyRate: '',
    vehicles: ''
  });

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    const category = {
      id: categories.length + 1,
      name: newCategory.name,
      vehicles: newCategory.vehicles.split(',').map(v => v.trim()),
      baseFare: parseFloat(newCategory.baseFare),
      perMile: parseFloat(newCategory.perMile),
      hourlyRate: parseFloat(newCategory.hourlyRate),
      status: "active"
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', baseFare: '', perMile: '', hourlyRate: '', vehicles: '' });
    setShowAddForm(false);
    
    toast({
      title: "Category Added",
      description: `${category.name} has been added successfully`,
    });
  };

  const handleEditCategory = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      setNewCategory({
        name: category.name,
        baseFare: category.baseFare.toString(),
        perMile: category.perMile.toString(),
        hourlyRate: category.hourlyRate.toString(),
        vehicles: category.vehicles.join(', ')
      });
      setEditingCategory(id);
      setShowAddForm(true);
    }
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(category => 
        category.id === editingCategory 
          ? {
              ...category,
              name: newCategory.name,
              vehicles: newCategory.vehicles.split(',').map(v => v.trim()),
              baseFare: parseFloat(newCategory.baseFare),
              perMile: parseFloat(newCategory.perMile),
              hourlyRate: parseFloat(newCategory.hourlyRate)
            }
          : category
      ));
      
      setNewCategory({ name: '', baseFare: '', perMile: '', hourlyRate: '', vehicles: '' });
      setEditingCategory(null);
      setShowAddForm(false);
      
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully",
      });
    }
  };

  const toggleCategoryStatus = (id: number) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, status: category.status === 'active' ? 'inactive' : 'active' }
        : category
    ));
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: "Category Deleted",
      description: "Vehicle category has been removed from the system",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Categories</h1>
        <Button 
          className="admin-gradient"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="baseFare">Base Fare (1-10 miles) ($)</Label>
                  <Input
                    id="baseFare"
                    type="number"
                    step="0.01"
                    value={newCategory.baseFare}
                    onChange={(e) => setNewCategory({...newCategory, baseFare: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="perMile">Per Mile (Above 10 mi) ($)</Label>
                  <Input
                    id="perMile"
                    type="number"
                    step="0.01"
                    value={newCategory.perMile}
                    onChange={(e) => setNewCategory({...newCategory, perMile: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={newCategory.hourlyRate}
                    onChange={(e) => setNewCategory({...newCategory, hourlyRate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="vehicles">Vehicles (comma separated)</Label>
                <Input
                  id="vehicles"
                  value={newCategory.vehicles}
                  onChange={(e) => setNewCategory({...newCategory, vehicles: e.target.value})}
                  placeholder="e.g., BMW 5 Series, Mercedes C-Class, Audi A4"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="admin-gradient">
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setNewCategory({ name: '', baseFare: '', perMile: '', hourlyRate: '', vehicles: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="p-2 admin-gradient rounded-lg">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600">{category.vehicles.length} vehicles</p>
                  </div>
                </div>
                {getStatusBadge(category.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Fare Structure</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${category.baseFare}</p>
                    <p className="text-gray-600">Base</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${category.perMile}/mi</p>
                    <p className="text-gray-600">Per Mile</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="w-3 h-3 text-gray-600" />
                    </div>
                    <p className="font-semibold">${category.hourlyRate}/hr</p>
                    <p className="text-gray-600">Hourly</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Vehicles Included</h4>
                <div className="text-sm text-gray-600">
                  {category.vehicles.map((vehicle, index) => (
                    <span key={index}>
                      {vehicle}
                      {index < category.vehicles.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditCategory(category.id)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={category.status === 'active' ? 'text-yellow-600' : 'text-green-600'}
                >
                  {category.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteCategory(category.id)}
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

export default VehicleManagement;
