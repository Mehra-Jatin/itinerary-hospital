import React, { useState, useRef } from 'react';
import { 
  ImagePlus, 
  Upload, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from '@/contexts/AdminContext';
import logoImg from '../../../../components/Images/logo-header.png';

const LogoUploadDialog = ({ children }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);
  const { uploadLogo, currentLogo, uploadProgress } = useAdmin();
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please upload a logo smaller than 5MB"
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setUploadError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadLogo(selectedFile);
      toast({
        title: "Logo Updated",
        description: "Your website logo has been successfully updated.",
        variant: "success"
      });
      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      setUploadError("Failed to upload logo. Please try again.");
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "There was an error uploading your logo."
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveLogo = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ImagePlus className="mr-2" /> Manage Website Logo
          </DialogTitle>
          <DialogDescription>
            Upload a new logo for your website. Recommended size: 500x500px
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                {previewImage || currentLogo ? (
                  <div className="relative max-w-full sm:max-w-xs">
                    <img 
                      src={previewImage || currentLogo} 
                      alt="Logo Preview" 
                      className="w-full max-h-64 object-contain rounded-lg shadow-md"
                    />
                    {uploadProgress > 0 && (
                      <Progress 
                        value={uploadProgress} 
                        className="absolute bottom-0 left-0 right-0"
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed rounded-lg">
                    <ImagePlus 
                      className="text-gray-400" 
                      size={48} 
                    />
                    <p className="text-gray-500 text-center">
                      No logo uploaded. Click below to select a file.
                    </p>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <Button 
                    variant="outline" 
                    onClick={triggerFileInput}
                  >
                    <Upload className="mr-2" size={16} /> 
                    {currentLogo ? 'Change Logo' : 'Select Logo'}
                  </Button>
                  
                  {(previewImage || currentLogo) && (
                    <Button 
                      variant="destructive" 
                      onClick={handleRemoveLogo}
                    >
                      <Trash2 className="mr-2" size={16} /> 
                      Remove
                    </Button>
                  )}
                </div>

                {selectedFile && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{selectedFile.name}</span>
                      <span>{(selectedFile.size / 1024).toFixed(2)} KB</span>
                    </div>
                    <Button 
                      onClick={handleUpload} 
                      className="w-full"
                      disabled={uploadProgress > 0}
                    >
                      <CheckCircle className="mr-2" size={16} />
                      Upload Logo
                    </Button>
                  </div>
                )}

                {uploadError && (
                  <div className="w-full flex items-center text-red-500">
                    <AlertTriangle className="mr-2" size={16} />
                    {uploadError}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ManageUi = () => {
  const { currentLogo } = useAdmin();
  const displayLogo = currentLogo || logoImg;

  return (
    <div className="container p-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Branding</CardTitle>
            <CardDescription>
              Manage and customize your website's visual identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <img 
                  src={displayLogo} 
                  alt="Current Logo" 
                  className="w-36 object-contain"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentLogo ? 'Custom Logo' : 'Default Logo'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentLogo 
                      ? 'Your website is using a custom logo' 
                      : 'Using the default website logo'}
                  </p>
                </div>
              </div>
              
              <LogoUploadDialog>
                <Button>
                  <Upload className="mr-2" size={16} /> 
                  Manage Logo
                </Button>
              </LogoUploadDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageUi;
