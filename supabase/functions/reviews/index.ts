// supabase/functions/reviews/index.ts
// Edge Function that returns cleaned Google reviews for the site to render.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
    const PLACE_ID = Deno.env.get("PLACE_ID");

    console.log('Fetching reviews for place_id:', PLACE_ID);

    if (!GOOGLE_API_KEY || !PLACE_ID) {
      console.error('Missing environment variables');
      return new Response(
        JSON.stringify({ error: "Missing GOOGLE_API_KEY or PLACE_ID" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Ask Google Places Details API for business info + reviews
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", PLACE_ID);
    // keep fields minimal to control cost/latency
    url.searchParams.set(
      "fields",
      "name,rating,user_ratings_total,reviews"
    );
    url.searchParams.set("key", GOOGLE_API_KEY);

    console.log('Calling Google Places API...');
    const gRes = await fetch(url.toString());
    const placeData = await gRes.json();

    console.log('Google API response status:', placeData.status);

    if (placeData.status !== "OK") {
      console.error('Google API error:', placeData.status, placeData.error_message);
      return new Response(
        JSON.stringify({
          error: "Google API error",
          details: placeData.status,
          message: placeData.error_message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Pull fields we care about
    const bizName = placeData.result.name;
    const avgRating = placeData.result.rating;
    const totalRatings = placeData.result.user_ratings_total;

    // Map raw Google reviews -> clean shape for frontend
    const cleanedReviews = (placeData.result.reviews || [])
      .filter((r: any) => r.text && r.text.trim().length > 0)
      .map((r: any) => ({
        author: r.author_name,
        avatar: r.profile_photo_url,
        rating: r.rating,
        text: r.text,
        time: r.relative_time_description,
      }));

    console.log(`Successfully fetched ${cleanedReviews.length} reviews`);

    const payload = {
      businessName: bizName,
      avgRating,
      totalRatings,
      reviews: cleanedReviews,
      source: "Google"
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(
      JSON.stringify({ error: "Server error", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
