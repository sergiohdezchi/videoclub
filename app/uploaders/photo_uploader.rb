class PhotoUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick
  #include CarrierWave::MiniMagick
  
  # Choose what kind of storage to use for this uploader:
  storage :fog

end
