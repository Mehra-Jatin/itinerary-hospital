import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Filter } from 'lucide-react'

const FilterSection = ({ title, options, selectedFilters, onChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    {options.map((option) => (
      <div key={option.value} className="flex items-center space-x-2">
        <Checkbox
          id={`${title}-${option.value}`}
          checked={selectedFilters.includes(option.value)}
          onCheckedChange={(checked) => onChange(title.toLowerCase(), option.value, checked)}
        />
        <Label htmlFor={`${title}-${option.value}`} className="flex-1 cursor-pointer">
          {option.label}
        </Label>
        <span className="text-sm text-muted-foreground">({option.count})</span>
      </div>
    ))}
  </div>
)

const DoctorFilter = ({ specialtyOptions, ratingOptions, onFilterChange }) => {
  const [filters, setFilters] = useState({
    specialty: [],
    rating: []
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: checked
          ? [...prevFilters[filterType], value]
          : prevFilters[filterType].filter(item => item !== value)
      };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({ specialty: [], rating: [] });
    onFilterChange({ specialty: [], rating: [] });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your doctor search results
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
            <div className="space-y-6 py-4">
              <FilterSection
                title="Specialty"
                options={specialtyOptions}
                selectedFilters={filters.specialty}
                onChange={handleFilterChange}
              />
              <Separator />
              <FilterSection
                title="Rating"
                options={ratingOptions}
                selectedFilters={filters.rating}
                onChange={handleFilterChange}
              />
            </div>
          </ScrollArea>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={clearFilters}>Clear All</Button>
            <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block w-[300px] bg-background">
        <div className="sticky top-24 space-y-4 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button variant="ghost" onClick={clearFilters} className="h-auto p-0 text-base">
              Clear All
            </Button>
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
            <div className="space-y-6">
              <FilterSection
                title="Specialty"
                options={specialtyOptions}
                selectedFilters={filters.specialty}
                onChange={handleFilterChange}
              />
              <Separator />
              <FilterSection
                title="Rating"
                options={ratingOptions}
                selectedFilters={filters.rating}
                onChange={handleFilterChange}
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default DoctorFilter;

