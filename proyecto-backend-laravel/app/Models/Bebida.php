<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bebida extends Model
{
    use HasFactory;

    protected $table = 'bebidas';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
    ];

    public static function consulta($datos = null)
    {
        return Bebida::orderBy('id')->get();
    }

    public static function alta($datos)
    {

        $bebida = Hamburguesa::create([
            'nombre' => $datos['nombre'],
            'precio' => $datos['precio'],
        ]);

        return $bebida;
    }
}
