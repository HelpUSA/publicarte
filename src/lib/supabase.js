// src/lib/supabase.js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://shidnvbfphokalcwgjdf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoaWRudmJmcGhva2FsY3dnamRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMDM4NjksImV4cCI6MjA2NzY3OTg2OX0.t7cVkjkyJtLS4WGOm3qBAOGqr28Uu0swOYQ8dOqV2N4'

export const supabase = createClient(supabaseUrl, supabaseKey)
