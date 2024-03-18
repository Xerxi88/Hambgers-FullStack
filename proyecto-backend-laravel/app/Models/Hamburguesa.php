<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hamburguesa extends Model
{
    use HasFactory;

    protected $table = 'hamburguesas';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
    ];

    public static function consulta($datos = null)
    {
        return Hamburguesa::orderBy('id')->get();
    }

    public static function alta($datos)
    {

        $hamburguesa = Hamburguesa::create([
            'nombre' => $datos['nombre'],
            'precio' => $datos['precio'],
        ]);

        return $hamburguesa;
    }
}
