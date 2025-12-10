<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->hasHeader('Accept-Language')) {
            $lang = $request->header('Accept-Language');
            // Extract first language preference
            $locale = substr($lang, 0, 2);
            
            if (in_array($locale, ['en', 'es'])) {
                app()->setLocale($locale);
            }
        }
        
        return $next($request);
    }
}
