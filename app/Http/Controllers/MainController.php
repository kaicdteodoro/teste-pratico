<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function salarial(Request $request): array
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
                return [];
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

    public function sequencia(Request $request): array
    {
        $request->validate(["list" => "required|array"]);
        $list = $request->get("list");
        $smaller = $secondBigger =  min($list);
        $bigger = max($list);

        foreach ($list as $value) {
            if($value < $bigger && $value > $secondBigger) {
                $secondBigger = $value;
            }
        }

        return compact('smaller', 'bigger', 'secondBigger');
    }

    public function fibonacci(Request $request): array
    {
        $request->validate(["reference" => "required|decimal:0,2"]);
        $sequence = [];
        $sequence[1] = $sequence[0] = 1;
        $reference = (float)$request->get('reference');
        for ($i = 2; $i < $reference; $i++) {
            $sum = $sequence[$i - 2] + $sequence[$i - 1];
            if ($sequence[$i - 1] % 2 == 0) {
                $sum += $sequence[$i - 3];
            }
            $sequence[$i] = $sum;
        }

        $has = in_array($reference, $sequence);

        return compact('sequence', 'has');
    }
}
