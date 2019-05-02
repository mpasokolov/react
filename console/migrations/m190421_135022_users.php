<?php

use yii\db\Migration;

/**
 * Class m190421_135022_users
 */
class m190421_135022_users extends Migration
{
    public function safeUp() {
        $this -> createTable('users', [
            'id' => $this -> primaryKey(),
            'login' => $this -> string(100) -> notNull(),
            'password' => $this -> text() -> notNull(),
            'first_name' => $this -> string(100),
            'last_name' => $this -> string(100),
            'email' => $this -> text() -> notNull(),
            'access_token' => $this -> text() -> notNull(),
            'created_at' => $this -> integer(10) -> notNull(),
            'updated_at' => $this -> integer(10)
        ]);
}

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        $this -> dropTable('users');
    }
}
