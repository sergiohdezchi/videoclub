class PhotoUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick
  #include CarrierWave::MiniMagick
  
  # Choose what kind of storage to use for this uploader:
  storage :fog
  def default_url(*args)

      ActionController::Base.helpers.asset_path("default.png")

  end
  def extension_whitelist
    %w(jpg jpeg gif png)
  end
  
end
