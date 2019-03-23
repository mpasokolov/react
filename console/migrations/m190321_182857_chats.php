<?php

use yii\db\Migration;

/**
 * Class m190321_182857_chats
 */
class m190321_182857_chats extends Migration
{
    public function safeUp() {
        $this -> createTable('chats', [
            'id' => $this -> primaryKey(),
            'name' => $this -> string(100) -> notNull(),
            'admin' => $this -> integer() -> notNull(),
            'created_at' => $this -> integer(10) -> notNull(),
            'updated_at' => $this -> integer(10)
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        $this -> dropTable('chats');
    }
}