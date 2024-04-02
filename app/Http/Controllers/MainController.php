<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function salarial(Request $request)
    {
        $request->validate([
            "price" => "required|decimal:0,2",
            "hours" => "required|decimal:0,2",
            "children" => "required|int"
        ]);
        $children = $request->get('children');
        $bruto = $request->get('price') * $request->get('hours');
        switch (true) {
            default:
                return null;
            case ($bruto <= 788):
                $familia = 30.5 * $children;
                break;
            case ($bruto <= 1100):
                $familia = 18.5 * $children;
                break;
            case ($bruto > 1100):
                $familia = 11.9 * $children;
                break;
        }
        return compact('bruto', 'familia');
    }
}
