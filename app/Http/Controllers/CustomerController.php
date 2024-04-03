<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::all();
        $customers = $customers->map(function ($customer) {
            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'address' => $customer->address,
                'created_at' => Carbon::createFromFormat('Y-m-d H:i:s', $customer->created_at, 'Asia/Jakarta')->format('d F Y H:i:s'),
                'updated_at' => Carbon::createFromFormat('Y-m-d H:i:s', $customer->created_at, 'Asia/Jakarta')->format('d F Y H:i:s'),
            ];
        });
        return Inertia::render('Home', [
            'customers' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $customer = Customer::where('email', $request->email)->first();
        if ($customer) {
            return back()->withErrors([
                'message' => 'Email already exists'
            ]);
        }
        Customer::create($request->validate([
            'name' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required'],
            'address' => ['required'],
        ]));
        return to_route('index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $customer = Customer::find($id);
        if ($customer) {
            $customer->fill($request->validate([
                'name' => ['required'],
                'phone' => ['required'],
                'address' => ['required'],
            ]));
            $customer->updated_at = Carbon::now()->setTimezone('Asia/Jakarta');
            $customer->save();
        } else {
            return back()->withErrors([
                'message' => 'Customer not found'
            ]);
        }
        return to_route('index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        if ($customer) {
            $customer->deleted_at = Carbon::now();
            $customer->save();
        } else {
            return back()->withErrors([
                'message' => 'Customer not found'
            ]);
        }
        return to_route('index');
    }
}
