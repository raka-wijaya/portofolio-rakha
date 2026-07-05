import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zvwksmipfjjdsnmjkhna.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2d2tzbWlwZmpqZHNubWpraG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4OTc2OTEsImV4cCI6MjA4OTQ3MzY5MX0.9cm0LDSEg-ryd-fIg9sEPcpfw37NdcajSoVuGIkhhY8'

export const supabase = createClient(supabaseUrl, supabaseKey)