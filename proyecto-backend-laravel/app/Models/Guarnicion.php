<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guarnicion extends Model
{
    use HasFactory;

    protected $table = 'guarniciones';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
    ];

    public static function consulta($datos = null)
    {
        return Guarnicion::orderBy('id')->get();
    }

    public static function alta($datos)
    {

        $guarnicion = Hamburguesa::create([
            'nombre' => $datos['nombre'],
            'precio' => $datos['precio'],
        ]);

        return $guarnicion;
    }
}
