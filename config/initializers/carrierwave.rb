CarrierWave.configure do |config|
  config.fog_provider = 'fog/google'                        # required
  config.fog_credentials = {
    provider:                         'Google',
    google_storage_access_key_id:     'GOOGY7N4JAX7XZT2VLCVAXEF',
    google_storage_secret_access_key: 'yMyA/nnNvtNz0GiI0xI4jyY4U9EZRfDgOc0qdf3q'
  }
  config.storage = :fog
  config.fog_directory = 'videoclubhm'
end