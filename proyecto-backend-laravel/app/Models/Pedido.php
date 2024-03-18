<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';
    public $timestamps = false;

    protected $fillable = [
        'nombre_cliente',
        'comentario',
        'hora_pedido',
        'idhamburguesa',
        'idguarnicion',
        'idbebida'
    ];

    public static function consulta($datos = null)
    {
        return Pedido::orderBy('hora_pedido')->get();
    }

    public static function alta($datos)
    {

        $pedido = Pedido::create([
            'nombre_cliente' => $datos['nombre_cliente'],
            'comentario' => $datos['comentario'],
            'idhamburguesa' => $datos['idhamburguesa'],
            'idguarnicion' => $datos['idguarnicion'],
            'idbebida' => $datos['idbebida']
        ]);

        return $pedido;
    }
}
