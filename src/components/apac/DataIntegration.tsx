import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Database, Upload, CheckCircle, AlertCircle, RefreshCw, Link as LinkIcon } from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
  icon: string;
}

export default function DataIntegration() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: '1', name: 'Salesforce CRM', status: 'connected', lastSync: '2024-03-15 14:30', icon: '💼' },
    { id: '2', name: 'HubSpot', status: 'disconnected', icon: '🎯' },
    { id: '3', name: 'Google Analytics', status: 'connected', lastSync: '2024-03-15 12:45', icon: '📊' },
    { id: '4', name: 'Mailchimp', status: 'disconnected', icon: '📧' },
    { id: '5', name: 'Zendesk', status: 'connected', lastSync: '2024-03-15 13:15', icon: '🎮' }
  ]);

  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleConnect = async (sourceId: string) => {
    setIsConnecting(sourceId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDataSources(prev => prev.map(source => {
      if (source.id === sourceId) {
        return {
          ...source,
          status: 'connected',
          lastSync: new Date().toLocaleString()
        };
      }
      return source;
    }));
    setIsConnecting(null);
  };

  const handleSync = async (sourceId: string) => {
    setIsSyncing(sourceId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDataSources(prev => prev.map(source => {
      if (source.id === sourceId) {
        return {
          ...source,
          lastSync: new Date().toLocaleString()
        };
      }
      return source;
    }));
    setIsSyncing(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json']
    }
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Connected Data Sources</h3>
          <span className="text-sm text-gray-500">
            {dataSources.filter(s => s.status === 'connected').length} of {dataSources.length} connected
          </span>
        </div>
        
        <div className="space-y-4">
          {dataSources.map((source) => (
            <div 
              key={source.id} 
              className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                source.status === 'connected' ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{source.icon}</div>
                <div>
                  <p className="font-medium text-gray-900">{source.name}</p>
                  {source.lastSync && (
                    <p className="text-sm text-gray-500">Last synced: {source.lastSync}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {source.status === 'connected' ? (
                  <>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      Connected
                    </span>
                    <button
                      onClick={() => handleSync(source.id)}
                      disabled={isSyncing === source.id}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100 ${
                        isSyncing === source.id ? 'opacity-50 cursor-wait' : ''
                      }`}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${isSyncing === source.id ? 'animate-spin' : ''}`} />
                      {isSyncing === source.id ? 'Syncing...' : 'Sync Now'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(source.id)}
                    disabled={isConnecting === source.id}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ${
                      isConnecting === source.id ? 'opacity-50 cursor-wait' : ''
                    }`}
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    {isConnecting === source.id ? 'Connecting...' : 'Connect'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Custom Data</h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...getInputProps()} />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragActive ? 'text-indigo-500' : 'text-gray-400'}`} />
          <p className="text-gray-600">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag and drop files here, or click to select files'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports CSV, Excel, and JSON files up to 50MB
          </p>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}